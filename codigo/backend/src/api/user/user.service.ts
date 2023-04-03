import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRequest, UpdateNameDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;
  // TODO: Change Entity pattern from Active Record to Data Mapper, with implementations of repositories

  public async updateName(body: UpdateNameDto, req: IRequest): Promise<User> {
    const user: User = <User>req.user;

    user.name = body.name;

    return this.repository.save(user);
  }
}
