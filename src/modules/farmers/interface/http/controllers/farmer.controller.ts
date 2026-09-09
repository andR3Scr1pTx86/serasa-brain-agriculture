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

@Controller('farmers')
export class FarmerController {
  constructor(
    private readonly createFarmerUseCase: CreateFarmerUseCase,
    private readonly updateFarmerUseCase: UpdateFarmerUseCase,
    private readonly deleteFarmerUseCase: DeleteFarmerUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateFarmerRequestDto) {
    return this.createFarmerUseCase.execute({
      name: body.name,
      document: body.document,
    });
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateFarmerRequestDto,
  ) {
    return this.updateFarmerUseCase.execute({
      id,
      name: body.name,
      document: body.document,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.deleteFarmerUseCase.execute(id);
  }
}
