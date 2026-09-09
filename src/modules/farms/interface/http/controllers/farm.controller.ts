import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateFarmRequestDto } from '../dtos/create-farm-request.dto.js';
import { CreateFarmUseCase } from '../../../application/use-cases/create-farm.use-case.js';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFarmResponseDto } from '../dtos/create-farm-response.dto.js';

@ApiTags('Farms')
@Controller('farms')
export class FarmController {
  constructor(private readonly createFarmUseCase: CreateFarmUseCase) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cadastrar uma nova fazenda para um produtor rural' })
  @ApiResponse({
    status: 201,
    description: 'Fazenda cadastrada com sucesso.',
    type: CreateFarmResponseDto,
  })
  async create(@Body() body: CreateFarmRequestDto): Promise<CreateFarmResponseDto> {
    return this.createFarmUseCase.execute(body);
  }
}
