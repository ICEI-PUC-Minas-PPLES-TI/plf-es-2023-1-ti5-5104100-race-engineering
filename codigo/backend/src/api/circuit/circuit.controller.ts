import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CircuitService } from './circuit.service';
import {
  CreateCircuitDto,
  ListedCircuit,
  UpdateCircuitDto,
} from './models/circuit.dto';
import { Circuit } from '@/api/circuit/models/circuit.entity';
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('circuits')
@ApiTags('Circuits')
export class CircuitController {
  constructor(private readonly circuitService: CircuitService) {}

  @Post()
  @ApiBody({ type: CreateCircuitDto })
  @ApiOkResponse({ description: 'The circuit was created successfully' })
  @UseInterceptors(ClassSerializerInterceptor)
  private create(@Body() body: CreateCircuitDto): Promise<Circuit | never> {
    return this.circuitService.create(body);
  }

  @Get()
  @ApiResponse({ type: [ListedCircuit], description: 'Successful operation' })
  private async findAll(): Promise<ListedCircuit[]> {
    return this.circuitService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: Circuit, description: 'Successful operation' })
  private async findOne(@Param('id') id: string): Promise<Circuit> {
    return this.circuitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCircuitDto: UpdateCircuitDto) {
    return this.circuitService.update(+id, updateCircuitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.circuitService.remove(+id);
  }
}
