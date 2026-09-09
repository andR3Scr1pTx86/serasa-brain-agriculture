import { Body, Controller, Post } from '@nestjs/common';
import { CreateFarmRequestDto } from '../dtos/create-farm-request.dto.js';
import { CreateFarmUseCase } from '../../../application/use-cases/create-farm.use-case.js';

@Controller('farms')
export class FarmController {
  constructor(private readonly createFarmUseCase: CreateFarmUseCase) {}

  @Post()
  async create(@Body() body: CreateFarmRequestDto) {
    return this.createFarmUseCase.execute(body);
  }
}
