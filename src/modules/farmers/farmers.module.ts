import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FarmerOrmEntity } from "./infrastructure/database/entities/farmer-orm.entity.js";
import { FarmerController } from "./interface/http/controllers/farmer.controller.js";
import { CreateFarmerUseCase } from "./application/use-cases/create-farmer.use-case.js";
import { FARMER_REPOSITORY_TOKEN } from "./domain/repositories/farmer.repository.interface.js";
import { FarmerOrmRepository } from "./infrastructure/database/repositories/farmer-orm.repository.js";
import { UpdateFarmerUseCase } from "./application/use-cases/update-farmer.use-case.js";
import { DeleteFarmerUseCase } from "./application/use-cases/delete-farmer.use-case.js";

@Module({
    imports: [TypeOrmModule.forFeature([FarmerOrmEntity])],
    controllers: [FarmerController],
    providers: [
        CreateFarmerUseCase,
        UpdateFarmerUseCase,
        DeleteFarmerUseCase,
        {
            provide: FARMER_REPOSITORY_TOKEN,
            useClass: FarmerOrmRepository,
        },
    ],
    exports: [
        CreateFarmerUseCase,
        UpdateFarmerUseCase,
        DeleteFarmerUseCase,
        FARMER_REPOSITORY_TOKEN
    ],
})
export class FarmersModule { }