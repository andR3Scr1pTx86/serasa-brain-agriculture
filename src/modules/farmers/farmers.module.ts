import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FarmerOrmEntity } from "./infraestructure/database/entities/farmer-orm.entity.js";
import { FarmerController } from "./interface/http/controllers/farmer.controller.js";
import { CreateFarmerUseCase } from "./application/use-cases/create-farmer.use-case.js";
import { FARMER_REPOSITORY_TOKEN } from "./domain/repositories/farmer.repository.interface.js";
import { OrmFarmerRepository } from "./infraestructure/database/repositories/farmer-orm.repository.js";

@Module({
    imports: [TypeOrmModule.forFeature([FarmerOrmEntity])],
    controllers: [FarmerController],
    providers: [
        CreateFarmerUseCase,
        {
            provide: FARMER_REPOSITORY_TOKEN,
            useClass: OrmFarmerRepository,
        },
    ],
    exports: [CreateFarmerUseCase, FARMER_REPOSITORY_TOKEN],
})
export class FarmersModule { }