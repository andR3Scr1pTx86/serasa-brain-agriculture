import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CROP_REPOSITORY_TOKEN, type ICropRepository } from "../../domain/repositories/crop.repository.interface.js";
import { FARM_REPOSITORY_TOKEN, type IFarmRepository } from "../../../farms/domain/repositories/farm.repository.interface.js";
import { CreateCropInputDto, CreateCropOutputDto } from "../dtos/create-crop.dto.js";
import { Crop } from "../../domain/entities/crop.entity.js";

@Injectable()
export class CreateCropUseCase {
    constructor(
        @Inject(CROP_REPOSITORY_TOKEN)
        private readonly cropRepository: ICropRepository,
        @Inject(FARM_REPOSITORY_TOKEN)
        private readonly farmRepository: IFarmRepository,
    ) { }

    async execute(input: CreateCropInputDto): Promise<CreateCropOutputDto> {
        const farmExists = await this.farmRepository.findById(input.farmId);

        if (!farmExists) {
            throw new NotFoundException('Farm not found');
        }

        const crop = Crop.create({
            farmId: input.farmId,
            cropYear: input.cropYear,
            plantedCrop: input.plantedCrop,
        });

        await this.cropRepository.save(crop);

        return {
            id: crop.getId(),
            farmId: crop.getFarmId(),
            cropYear: crop.getCropYear(),
            plantedCrop: crop.getPlantedCrop(),
            createdAt: crop.getCreatedAt(),
        };
    }
}