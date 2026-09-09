import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  FARM_REPOSITORY_TOKEN,
  type IFarmRepository,
} from '../../domain/repositories/farm.repository.interface.js';
import {
  FARMER_REPOSITORY_TOKEN,
  type IFarmerRepository,
} from '../../../farmers/domain/repositories/farmer.repository.interface.js';
import {
  CreateFarmInputDto,
  CreateFarmOutputDto,
} from '../dtos/create-farm.dto.js';
import { Farm } from '../../domain/entities/farm.entity.js';
import { EntityNotFoundError } from '../../../../shared/domain/errors/domain-errors.js';

@Injectable()
export class CreateFarmUseCase {
  constructor(
    @Inject(FARM_REPOSITORY_TOKEN)
    private readonly farmRepository: IFarmRepository,
    @Inject(FARMER_REPOSITORY_TOKEN)
    private readonly farmerRepository: IFarmerRepository,
  ) {}

  async execute(input: CreateFarmInputDto): Promise<CreateFarmOutputDto> {
    const farmerExists = await this.farmerRepository.findById(input.farmerId);

    if (!farmerExists) {
      throw new EntityNotFoundError('Farmer not found');
    }

    const farm = Farm.create({
      farmerId: input.farmerId,
      name: input.name,
      city: input.city,
      state: input.state,
      totalAreaHa: input.totalAreaHa,
      totalArableAreaHa: input.totalArableAreaHa,
      totalVegetationAreaHa: input.totalVegetationAreaHa,
    });

    await this.farmRepository.save(farm);

    return {
      id: farm.getId(),
      farmerId: farm.getFarmerId(),
      name: farm.getName(),
      city: farm.getCity(),
      state: farm.getState(),
      totalAreaHa: farm.getTotalAreaHa(),
      totalArableAreaHa: farm.getTotalArableAreaHa(),
      totalVegetationAreaHa: farm.getTotalVegetationAreaHa(),
      createdAt: farm.getCreatedAt(),
    };
  }
}
