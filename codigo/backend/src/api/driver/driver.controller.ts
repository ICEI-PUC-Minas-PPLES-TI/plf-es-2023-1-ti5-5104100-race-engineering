import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { EditDriverDTO } from './models/driver.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('drivers')
@ApiTags('Drivers')
export class DriverController {
  @Inject(DriverService)
  private readonly driverService: DriverService;

  @Get()
  findAll() {
    return this.driverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driverService.findOneDetailed(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: EditDriverDTO) {
    return this.driverService.update(+id, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverService.remove(+id);
  }
}
