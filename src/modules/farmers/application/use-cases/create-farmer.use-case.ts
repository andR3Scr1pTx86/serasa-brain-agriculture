import { ConflictException, Inject, Injectable } from "@nestjs/common";

import { FARMER_REPOSITORY_TOKEN, type IFarmerRepository } from "../../domain/repositories/farmer.repository.interface.js";
import { CreateFarmerInputDto, CreateFarmerOutputDto } from "../dtos/create-farmer.dto.js";
import { Document } from "../../domain/value-objects/document.vo.js";
import { Farmer } from "../../domain/entities/farmer.entity.js";

@Injectable()
export class CreateFarmerUseCase {
    constructor(
        @Inject(FARMER_REPOSITORY_TOKEN)
        private readonly farmerRepository: IFarmerRepository,
    ) { }

    async execute(input: CreateFarmerInputDto): Promise<CreateFarmerOutputDto> {
        const documentVo = Document.create(input.document);

        const farmerExists = await this.farmerRepository.findByDocument(documentVo);

        if (farmerExists) {
            throw new ConflictException('Farmer already exists with this document');
        }

        const farmer = Farmer.create({
            name: input.name,
            document: documentVo,
        });

        await this.farmerRepository.save(farmer);

        return {
            id: farmer.getId(),
            name: farmer.getName(),
            document: farmer.getDocument().getValue(),
            createdAt: farmer.getCreatedAt(),
        };
    }
}