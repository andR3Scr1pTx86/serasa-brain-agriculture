import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';

import { CropOrmRepository } from './crop-orm.repository.js';
import { clearDatabase, TestDataSource } from '../../../../../../test/helpers/database.helper.js';
import { CropOrmEntity } from '../entities/crop-orm.entity.js';
import { FarmerOrmEntity } from '../../../../farmers/infrastructure/database/entities/farmer-orm.entity.js';
import { FarmOrmEntity } from '../../../../farms/infrastructure/database/entities/farm-orm.entity.js';
import { Crop } from '../../../domain/entities/crop.entity.js';

describe('CropOrmRepository (Integration)', () => {
    let cropRepository: CropOrmRepository;

    const farmerId = '5e67c937-f894-4875-9d2c-329fa40ce325';
    const farmId = 'd5eb0f69-4a9f-40a1-8e8b-067c873f0212';

    beforeAll(async () => {
        await TestDataSource.initialize();

        const cropOrmRepository = TestDataSource.getRepository(CropOrmEntity);
        cropRepository = new CropOrmRepository(cropOrmRepository);
    });

    afterAll(async () => {
        await TestDataSource.destroy();
    });

    beforeEach(async () => {
        await clearDatabase();

        const farmerRepo = TestDataSource.getRepository(FarmerOrmEntity);
        const farmRepo = TestDataSource.getRepository(FarmOrmEntity);

        await farmerRepo.save({
            id: farmerId,
            name: 'Lyafo',
            document: '269.914.900-40',
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await farmRepo.save({
            id: farmId,
            farmerId,
            name: 'Fazenda Ovelha Feliz',
            city: 'Ribeirão Preto',
            state: 'SP',
            totalAreaHa: 500,
            totalArableAreaHa: 300,
            totalVegetationAreaHa: 200,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });

    it('should save a new crop and retrieve it by id', async () => {
        const cropDomain = Crop.create({
            farmId,
            cropYear: '2026',
            plantedCrop: 'Café',
        });

        await cropRepository.save(cropDomain);

        const foundCrop = await cropRepository.findById(cropDomain.getId());

        expect(foundCrop).not.toBeNull();
        expect(foundCrop?.getId()).toBe(cropDomain.getId());
        expect(foundCrop?.getFarmId()).toBe(farmId);
        expect(foundCrop?.getCropYear()).toBe('2026');
        expect(foundCrop?.getPlantedCrop()).toBe('Café');
        expect(foundCrop?.getCreatedAt()).toBeInstanceOf(Date);
    });

    it('should return null when trying to find a crop by non-existing id', async () => {
        const foundCrop = await cropRepository.findById('a5febad3-8fb0-488b-a535-de588d2d49cc');

        expect(foundCrop).toBeNull();
    });
});