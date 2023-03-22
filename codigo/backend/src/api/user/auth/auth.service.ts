import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/api/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto, LoginDto } from './models/auth.dto';
import { AuthHelper } from './auth.helper';
import { AuthResponse } from '@/api/user/auth/models/auth.interface';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<User | never> {
    const { name, email, password }: RegisterDto = body;
    let user: User = await this.repository.findOne({ where: { email } });

    if (user) {
      throw new HttpException(
        'Conflict: The email is already in use ',
        HttpStatus.CONFLICT,
      );
    }

    user = new User();

    user.name = name;
    user.email = email;
    user.password = this.helper.encodePassword(password);

    return this.repository.save(user);
  }

  public async login(body: LoginDto): Promise<AuthResponse | never> {
    const { email, password }: LoginDto = body;
    const user: User = await this.repository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.NOT_FOUND,
      );
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.repository.update(user.id, { lastLoginAt: new Date() });
    const token = this.helper.generateToken(user);
    return { token };
  }

  public async refresh(user: User): Promise<AuthResponse> {
    await this.repository.update(user.id, { lastLoginAt: new Date() });
    const token = this.helper.generateToken(user);
    return { token };
  }
}
