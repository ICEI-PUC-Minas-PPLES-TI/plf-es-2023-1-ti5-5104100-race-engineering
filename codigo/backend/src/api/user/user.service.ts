import { Injectable, NotFoundException } from '@nestjs/common';
import { IRequest, ListedUser, UpdateNameDto } from './models/user.dto';
import { Role, User } from './models/user.entity';
import { Race } from '@/api/race/models/race.entity';
import { DriverService } from '@/api/driver/driver.service';

@Injectable()
export class UserService {
  constructor(private readonly driverService: DriverService) {}

  public async updateName(body: UpdateNameDto, req: IRequest): Promise<User> {
    const user: User = <User>req.user;

    user.name = body.name;

    return User.save(user);
  }

  async findOne(id: number, role?): Promise<User> {
    const user = await User.findOne({
      where: { id, role },
      relations: ['driver', 'analystRaces', 'mechanicRaces'],
    });
    if (!user)
      throw new NotFoundException({
        message: 'User not found or invalid UserType!',
      });
    return user;
  }

  async setAnalystMainRace(race: Race, userId: number) {
    const user = await this.findOne(userId, Role.Analyst);
    user.analystMainRace = race;
    return user.save();
  }

  async listMechanics(): Promise<ListedUser[]> {
    const mechanics = await User.find({ where: { role: Role.Mechanic } });
    return mechanics.map((mechanic) => {
      return { id: mechanic.id, name: mechanic.name };
    });
  }

  async listDrivers(): Promise<ListedUser[]> {
    const drivers = await this.driverService.findAll();
    return drivers.map((driver) => {
      return { id: driver.id, name: driver.name };
    });
  }

  async listAnalysts(): Promise<ListedUser[]> {
    const analysts = await User.find({ where: { role: Role.Analyst } });
    return analysts.map((analyst) => {
      return { id: analyst.id, name: analyst.name };
    });
  }
}
