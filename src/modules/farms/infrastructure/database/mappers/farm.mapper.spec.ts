import { describe, it, expect } from 'vitest';

import { TestDataFactory } from '../../../../../../test/factories/data.factory.js';
import { FarmMapper } from './farm.mapper.js';
import { FarmOrmEntity } from '../entities/farm-orm.entity.js';

describe('FarmMapper', () => {
    describe('toOrm', () => {
        it('should map a Farm domain entity to a FarmOrmEntity', () => {
            const farmerId = '84b01103-7c42-4acb-b6cd-a60e9e75bceb';

            const farmDomain = TestDataFactory.createFarm(farmerId, {
                name: 'Fazenda Primavera',
                city: 'Uberlândia',
                state: 'MG',
                totalAreaHa: 1000,
                totalArableAreaHa: 600,
                totalVegetationAreaHa: 400,
            });

            const ormEntity = FarmMapper.toOrm(farmDomain);

            expect(ormEntity).toBeInstanceOf(FarmOrmEntity);
            expect(ormEntity.id).toBe(farmDomain.getId());
            expect(ormEntity.farmerId).toBe(farmDomain.getFarmerId());
            expect(ormEntity.name).toBe(farmDomain.getName());
            expect(ormEntity.city).toBe(farmDomain.getCity());
            expect(ormEntity.state).toBe(farmDomain.getState());
            expect(ormEntity.totalAreaHa).toBe(farmDomain.getTotalAreaHa());
            expect(ormEntity.totalArableAreaHa).toBe(farmDomain.getTotalArableAreaHa());
            expect(ormEntity.totalVegetationAreaHa).toBe(farmDomain.getTotalVegetationAreaHa());
            expect(ormEntity.createdAt).toEqual(farmDomain.getCreatedAt());
            expect(ormEntity.updatedAt).toEqual(farmDomain.getUpdatedAt());
        });
    });

    describe('toDomain', () => {
        it('should map a FarmOrmEntity to a Farm domain entity', () => {
            const now = new Date();

            const ormEntity = new FarmOrmEntity();

            ormEntity.id = '318d472d-6bb0-424d-8ead-8f37ea7540d8';
            ormEntity.farmerId = '84b01103-7c42-4acb-b6cd-a60e9e75bceb';
            ormEntity.name = 'Fazenda Campo Limpo';
            ormEntity.city = 'Maracaju';
            ormEntity.state = 'MS';
            ormEntity.totalAreaHa = '1500.5' as any;
            ormEntity.totalArableAreaHa = '1000.0' as any;
            ormEntity.totalVegetationAreaHa = '500.5' as any;
            ormEntity.createdAt = now;
            ormEntity.updatedAt = now;

            const farmDomain = FarmMapper.toDomain(ormEntity);

            expect(farmDomain.getId()).toBe('318d472d-6bb0-424d-8ead-8f37ea7540d8');
            expect(farmDomain.getFarmerId()).toBe('84b01103-7c42-4acb-b6cd-a60e9e75bceb');
            expect(farmDomain.getName()).toBe('Fazenda Campo Limpo');
            expect(farmDomain.getCity()).toBe('Maracaju');
            expect(farmDomain.getState()).toBe('MS');

            expect(farmDomain.getTotalAreaHa()).toBe(1500.5);
            expect(farmDomain.getTotalArableAreaHa()).toBe(1000.0);
            expect(farmDomain.getTotalVegetationAreaHa()).toBe(500.5);

            expect(farmDomain.getCreatedAt()).toEqual(now);
            expect(farmDomain.getUpdatedAt()).toEqual(now);
        });
    });
});