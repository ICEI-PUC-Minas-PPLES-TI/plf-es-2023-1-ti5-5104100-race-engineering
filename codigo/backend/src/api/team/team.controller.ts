import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto, UpdateTeamDto } from './models/team.dto';
import { ApiTags } from '@nestjs/swagger';
import { Team } from '@/api/team/models/team.entity';

@Controller('teams')
@ApiTags('Teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  private create(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamService.create(createTeamDto);
  }

  @Get()
  private findOne(@Query('id') id: string): Promise<Team> {
    return this.teamService.findOne(+id);
  }

  @Get()
  private findAll(): Promise<Team[]> {
    return this.teamService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamService.remove(+id);
  }
}
