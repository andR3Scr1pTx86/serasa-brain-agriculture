import { Module } from "@nestjs/common";
import { CropOrmEntity } from "./infrastructure/database/entities/crop-orm.entity.js";
import { FarmsModule } from "../farms/farms.module.js";
import { CropController } from "./interface/http/controllers/crop.controller.js";
import { CreateCropUseCase } from "./application/use-cases/create-crop.use-case.js";
import { CROP_REPOSITORY_TOKEN } from "./domain/repositories/crop.repository.interface.js";
import { CropOrmRepository } from "./infrastructure/database/repositories/crop-orm.repository.js";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([CropOrmEntity]),
        FarmsModule,
    ],
    controllers: [CropController],
    providers: [
        CreateCropUseCase,
        {
            provide: CROP_REPOSITORY_TOKEN,
            useClass: CropOrmRepository,
        },
    ],
    exports: [CreateCropUseCase, CROP_REPOSITORY_TOKEN],
})
export class CropsModule { }