import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import { AuthModule } from './auth/auth.module';
import { DriverService } from '@/api/driver/driver.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [UserController],
  providers: [UserService, DriverService],
})
export class UserModule {}