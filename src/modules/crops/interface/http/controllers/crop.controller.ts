import { Body, Controller, Post } from '@nestjs/common';
import { CreateCropUseCase } from '../../../application/use-cases/create-crop.use-case.js';
import { CreateCropRequestDto } from '../dtos/create-crop-request.dto.js';

@Controller('crops')
export class CropController {
  constructor(private readonly createCropUseCase: CreateCropUseCase) {}

  @Post()
  async create(@Body() body: CreateCropRequestDto) {
    return this.createCropUseCase.execute(body);
  }
}
