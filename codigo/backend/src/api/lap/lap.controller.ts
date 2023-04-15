import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LapService } from './lap.service';
import { CreateLapDto, UpdateLapDto } from './models/lap.dto';

@Controller('lap')
export class LapController {
  constructor(private readonly lapService: LapService) {}

  @Post()
  create(@Body() createLapDto: CreateLapDto) {
    return this.lapService.create(createLapDto);
  }

  @Get()
  findAll() {
    return this.lapService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lapService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLapDto: UpdateLapDto) {
    return this.lapService.update(+id, updateLapDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lapService.remove(+id);
  }
}
