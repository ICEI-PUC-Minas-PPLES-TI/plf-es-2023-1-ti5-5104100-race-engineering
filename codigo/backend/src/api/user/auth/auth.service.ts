import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserType } from '@/api/user/models/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto, LoginDto } from './models/auth.dto';
import { AuthHelper } from './auth.helper';
import { AuthResponse } from '@/api/user/auth/models/auth.interface';
import { Driver } from '@/api/driver/models/driver.entity';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<User | never> {
    const { name, email, password, userType }: RegisterDto = body;
    let user: User = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new HttpException(
        'Conflict: The email is already in use ',
        HttpStatus.CONFLICT,
      );
    }

    if (!Object.values(UserType).includes(userType as unknown as UserType)) {
      throw new HttpException(
        'Bad Request: The user type is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }

    user = new User();
    user.name = name;
    user.email = email;
    user.password = this.helper.encodePassword(password);
    user.userType = userType;
    user.createdAt = new Date();
    user.updatedAt = new Date();

    const userCreated = await this.userRepository.save(user);

    if (userType === UserType.Driver) {
      const driver = new Driver();
      driver.user = userCreated;
      await Driver.save(driver);
    }
    return userCreated;
  }

  public async login(body: LoginDto): Promise<AuthResponse | never> {
    const { email, password }: LoginDto = body;
    const user: User = await this.userRepository.findOne({ where: { email } });

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

    await this.userRepository.update(user.id, { lastLoginAt: new Date() });
    const token = this.helper.generateToken(user);
    return { token };
  }

  public async refresh(user: User): Promise<AuthResponse> {
    await this.userRepository.update(user.id, { lastLoginAt: new Date() });
    const token = this.helper.generateToken(user);
    return { token };
  }
}
