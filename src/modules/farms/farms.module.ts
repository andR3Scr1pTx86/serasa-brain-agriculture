import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FarmOrmEntity } from "./infraestructure/database/entities/farm-orm.entity.js";
import { FarmController } from "./interface/http/controllers/farm.controller.js";
import { CreateFarmUseCase } from "./application/use-cases/create-farm.use-case.js";
import { FARM_REPOSITORY_TOKEN } from "./domain/repositories/farm.repository.interface.js";
import { FarmOrmRepository } from "./infraestructure/database/repositories/farm-orm.repository.js";
import { FarmersModule } from "../farmers/farmers.module.js";

@Module({
    imports: [
        TypeOrmModule.forFeature([FarmOrmEntity]),
        FarmersModule,
    ],
    controllers: [FarmController],
    providers: [
        CreateFarmUseCase,
        {
            provide: FARM_REPOSITORY_TOKEN,
            useClass: FarmOrmRepository,
        },
    ],
    exports: [CreateFarmUseCase, FARM_REPOSITORY_TOKEN],
})
export class FarmsModule { }