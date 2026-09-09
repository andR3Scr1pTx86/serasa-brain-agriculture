import { Module } from "@nestjs/common";
import { FarmOrmEntity } from "../farms/infrastructure/database/entities/farm-orm.entity.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DashboardController } from "./interface/http/controllers/dashboard.controller.js";
import { GetDashboardSummaryUseCase } from "./application/use-cases/get-dashboard-summary.use-case.js";
import { DASHBOARD_REPOSITORY_TOKEN } from "./domain/repositories/dashboard.repository.interface.js";
import { DashboardOrmRepository } from "./infrastructure/database/repositories/dashboard-orm.repository.js";
import { CropOrmEntity } from "../crops/infrastructure/database/entities/crop-orm.entity.js";

@Module({
    imports: [TypeOrmModule.forFeature([FarmOrmEntity, CropOrmEntity])],
    controllers: [DashboardController],
    providers: [
        GetDashboardSummaryUseCase,
        {
            provide: DASHBOARD_REPOSITORY_TOKEN,
            useClass: DashboardOrmRepository,
        },
    ],
})
export class DashboardModule { }