import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { FARMER_REPOSITORY_TOKEN, type IFarmerRepository } from "../../domain/repositories/farmer.repository.interface.js";

@Injectable()
export class DeleteFarmerUseCase {
    constructor(
        @Inject(FARMER_REPOSITORY_TOKEN)
        private readonly farmerRepository: IFarmerRepository,
    ) { }

    async execute(id: string): Promise<void> {
        const farmer = await this.farmerRepository.findById(id);

        if (!farmer) {
            throw new NotFoundException('Farmer not found');
        }

        await this.farmerRepository.delete(id);
    }
}