import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateFarmerRequestDto } from '../dtos/create-farmer-request.dto.js';
import { CreateFarmerUseCase } from '../../../application/use-cases/create-farmer.use-case.js';
import { UpdateFarmerRequestDto } from '../dtos/update-farmer-request.dto.js';
import { UpdateFarmerUseCase } from '../../../application/use-cases/update-farmer.use-case.js';
import { DeleteFarmerUseCase } from '../../../application/use-cases/delete-farmer.use-case.js';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateFarmerResponseDto } from '../dtos/update-farmer-response.dto.js';
import { CreateFarmerResponseDto } from '../dtos/create-farmer-response.dto.js';

@ApiTags('Farmers')
@Controller('farmers')
export class FarmerController {
  constructor(
    private readonly createFarmerUseCase: CreateFarmerUseCase,
    private readonly updateFarmerUseCase: UpdateFarmerUseCase,
    private readonly deleteFarmerUseCase: DeleteFarmerUseCase,
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cadastrar um novo produtor rural' })
  @ApiResponse({
    status: 201,
    description: 'Produtor rural cadastrado com sucesso',
    type: CreateFarmerResponseDto,
  })
  async create(@Body() body: CreateFarmerRequestDto): Promise<CreateFarmerResponseDto> {
    return this.createFarmerUseCase.execute({
      name: body.name,
      document: body.document,
    });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualizar os dados de um produtor rural' })
  @ApiParam({
    name: 'id',
    description: 'Id do produtor rural (uuidv4)',
    example: 'ee419d21-a4bc-447a-9923-31f426c63067',
  })
  @ApiResponse({
    status: 200,
    description: 'Produtor rural atualizado com sucesso',
    type: UpdateFarmerResponseDto,
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateFarmerRequestDto,
  ): Promise<UpdateFarmerResponseDto> {
    return this.updateFarmerUseCase.execute({
      id,
      name: body.name,
      document: body.document,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover um produtor rural' })
  @ApiParam({
    name: 'id',
    description: 'Id do produtor rural (uuidv4)',
    example: 'ee419d21-a4bc-447a-9923-31f426c63067',
  })
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.deleteFarmerUseCase.execute(id);
  }
}
