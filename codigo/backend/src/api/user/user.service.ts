import { Injectable } from '@nestjs/common';
import { IRequest, ListedUser, UpdateNameDto } from './models/user.dto';
import { User } from './models/user.entity';

@Injectable()
export class UserService {
  // @InjectRepository(User)
  // private readonly repository: Repository<User>;
  // // TODO: Change Entity pattern from Active Record to Data Mapper, with implementations of repositories

  public async updateName(body: UpdateNameDto, req: IRequest): Promise<User> {
    const user: User = <User>req.user;

    user.name = body.name;

    return User.save(user);
  }

  async findOne(id: number): Promise<User> {
    return User.findOne({ where: { id } });
  }

  async listDrivers(): Promise<ListedUser[]> {
    const drivers = await User.find({ where: { userType: 'DRIVER' } });
    return drivers.map((driver) => {
      return { id: driver.id, name: driver.name };
    });
  }

  async listMechanics(): Promise<ListedUser[]> {
    const mechanics = await User.find({ where: { userType: 'MECHANIC' } });
    return mechanics.map((mechanic) => {
      return { id: mechanic.id, name: mechanic.name };
    });
  }

  async listAnalysts(): Promise<ListedUser[]> {
    const analysts = await User.find({ where: { userType: 'ANALYST' } });
    return analysts.map((analyst) => {
      return { id: analyst.id, name: analyst.name };
    });
  }
}
