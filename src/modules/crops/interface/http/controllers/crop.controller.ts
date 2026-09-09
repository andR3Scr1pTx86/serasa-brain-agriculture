import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateCropUseCase } from '../../../application/use-cases/create-crop.use-case.js';
import { CreateCropRequestDto } from '../dtos/create-crop-request.dto.js';
import { CreateCropResponseDto } from '../dtos/create-crop-response.dto.js';

@ApiTags('Crops')
@Controller('crops')
export class CropController {
  constructor(private readonly createCropUseCase: CreateCropUseCase) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cadastrar uma nova safra para uma fazenda de um produtor rural' })
  @ApiResponse({
    status: 201,
    description: 'Cultura cadastrada com sucesso.',
    type: CreateCropResponseDto,
  })
  async create(@Body() body: CreateCropRequestDto): Promise<CreateCropResponseDto> {
    return this.createCropUseCase.execute(body);
  }
}
