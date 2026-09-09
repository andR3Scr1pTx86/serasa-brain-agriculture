import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { DashboardOrmRepository } from './dashboard-orm.repository.js';
import { clearDatabase, TestDataSource } from '../../../../../../test/helpers/database.helper.js';
import { FarmOrmEntity } from '../../../../farms/infrastructure/database/entities/farm-orm.entity.js';
import { CropOrmEntity } from '../../../../crops/infrastructure/database/entities/crop-orm.entity.js';
import { FarmerOrmEntity } from '../../../../farmers/infrastructure/database/entities/farmer-orm.entity.js';

describe('DashboardOrmRepository (Integration)', () => {
    let repository: DashboardOrmRepository;

    beforeAll(async () => {
        await TestDataSource.initialize();

        const farmRepo = TestDataSource.getRepository(FarmOrmEntity);
        const cropRepo = TestDataSource.getRepository(CropOrmEntity);

        repository = new DashboardOrmRepository(farmRepo, cropRepo);
    });

    afterAll(async () => {
        await TestDataSource.destroy();
    });

    beforeEach(async () => {
        await clearDatabase();
    });

    it('should return aggregated metrics correctly from database', async () => {
        const farmerRepo = TestDataSource.getRepository(FarmerOrmEntity);

        const farmer = await farmerRepo.save({
            id: '5e67c937-f894-4875-9d2c-329fa40ce325',
            name: 'Lyafo',
            document: '269.914.900-40',
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const farmRepo = TestDataSource.getRepository(FarmOrmEntity);

        const farm1 = await farmRepo.save({
            id: 'd5eb0f69-4a9f-40a1-8e8b-067c873f0212',
            farmerId: farmer.id,
            name: 'Fazenda Ovelha Feliz',
            city: 'Ribeirão Preto',
            state: 'SP',
            totalAreaHa: 500,
            totalArableAreaHa: 300,
            totalVegetationAreaHa: 200,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const farm2 = await farmRepo.save({
            id: '727b9483-5861-4a85-b7ef-1524cb833c8c',
            farmerId: farmer.id,
            name: 'Fazenda da Lua',
            city: 'Divinopolis',
            state: 'MG',
            totalAreaHa: 1000,
            totalArableAreaHa: 600,
            totalVegetationAreaHa: 400,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const farm3 = await farmRepo.save({
            id: 'cefa693b-6517-4987-8238-82a9a31c5c9e',
            farmerId: farmer.id,
            name: 'Fazenda Estrelinha',
            city: 'Sorriso',
            state: 'MT',
            totalAreaHa: 1500,
            totalArableAreaHa: 1000,
            totalVegetationAreaHa: 500,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const cropRepo = TestDataSource.getRepository(CropOrmEntity);

        await cropRepo.save([
            {
                id: 'ae0a795e-87e6-40dd-a57c-ee642c9d9a27',
                farmId: farm1.id,
                cropYear: '2023',
                plantedCrop: 'Soja',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'fb4b6f30-ef9d-4179-aa80-36ab5c2d08a0',
                farmId: farm2.id,
                cropYear: '2023',
                plantedCrop: 'Soja',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '3435fd9d-020a-44a6-8709-34c8998a16aa',
                farmId: farm3.id,
                cropYear: '2023',
                plantedCrop: 'Milho',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);

        const summary = await repository.getSummary();

        expect(summary.totalFarms).toBe(3);
        expect(summary.totalHectares).toBe(3000);
        expect(summary.landUse.agriculturalArea).toBe(1900);
        expect(summary.landUse.vegetationArea).toBe(1100);
        expect(summary.byState).toHaveLength(3);
        expect(summary.byState).toEqual(
            expect.arrayContaining([
                { state: 'SP', count: 1 },
                { state: 'MG', count: 1 },
                { state: 'MT', count: 1 },
            ]),
        );
        expect(summary.byCrop).toHaveLength(2);
        expect(summary.byCrop).toEqual(
            expect.arrayContaining([
                { cropName: 'Soja', count: 2 },
                { cropName: 'Milho', count: 1 },
            ]),
        );
    });

    it('should return zeroed metrics when database is empty', async () => {
        const summary = await repository.getSummary();

        expect(summary.totalFarms).toBe(0);
        expect(summary.totalHectares).toBe(0);
        expect(summary.landUse.agriculturalArea).toBe(0);
        expect(summary.landUse.vegetationArea).toBe(0);
        expect(summary.byState).toEqual([]);
        expect(summary.byCrop).toEqual([]);
    });
});