import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IDashboardRepository } from "../../../domain/repositories/dashboard.repository.interface.js";
import { FarmOrmEntity } from "../../../../farms/infrastructure/database/entities/farm-orm.entity.js";
import { Repository } from "typeorm";
import { DashboardSummaryOutputDto } from "../../../application/dtos/dashboard-summary.dto.js";
import { CropOrmEntity } from "../../../../crops/infrastructure/database/entities/crop-orm.entity.js";

@Injectable()
export class DashboardOrmRepository implements IDashboardRepository {
    constructor(
        @InjectRepository(FarmOrmEntity)
        private readonly farmRepository: Repository<FarmOrmEntity>,
        @InjectRepository(CropOrmEntity)
        private readonly cropRepository: Repository<CropOrmEntity>,
    ) { }

    async getSummary(): Promise<DashboardSummaryOutputDto> {
        const [totalsRaw, byStateRaw, byCropRaw] = await Promise.all([
            this.farmRepository
                .createQueryBuilder('farm')
                .select('COUNT(farm.id)', 'totalFarms')
                .addSelect('COALESCE(SUM(farm.total_area_ha), 0)', 'totalHectares')
                .addSelect('COALESCE(SUM(farm.total_arable_area_ha), 0)', 'agriculturalArea')
                .addSelect('COALESCE(SUM(farm.total_vegetation_area_ha), 0)', 'vegetationArea')
                .getRawOne(),
            this.farmRepository
                .createQueryBuilder('farm')
                .select('farm.state', 'state')
                .addSelect('COUNT(farm.id)', 'count')
                .groupBy('farm.state')
                .getRawMany(),
            this.cropRepository
                .createQueryBuilder('crop')
                .select('crop.planted_crop', 'cropName')
                .addSelect('COUNT(crop.farm_id)', 'count')
                .groupBy('crop.planted_crop')
                .getRawMany()
        ])

        return {
            totalFarms: Number(totalsRaw.totalFarms),
            totalHectares: Number(totalsRaw.totalHectares),
            landUse: {
                agriculturalArea: Number(totalsRaw.agriculturalArea),
                vegetationArea: Number(totalsRaw.vegetationArea),
            },
            byState: byStateRaw.map((item) => ({
                state: item.state,
                count: Number(item.count),
            })),
            byCrop: byCropRaw.map((item) => ({
                cropName: item.cropName,
                count: Number(item.count),
            })),
        };
    }
}