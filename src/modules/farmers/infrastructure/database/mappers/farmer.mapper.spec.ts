import { describe, it, expect } from 'vitest';

import { Document } from '../../../domain/value-objects/document.vo.js';
import { Farmer } from '../../../domain/entities/farmer.entity.js';
import { FarmerMapper } from './farmer.mapper.js';
import { FarmerOrmEntity } from '../entities/farmer-orm.entity.js';

describe('FarmerMapper', () => {
    const validCpf = '766.656.270-55';
    const cleanCpf = '76665627055';

    describe('toOrm', () => {
        it('should map a Farmer domain entity to a FarmerOrmEntity', () => {
            const document = Document.create(validCpf);

            const farmerDomain = Farmer.create({
                name: 'Burue',
                document,
            });

            const ormEntity = FarmerMapper.toOrm(farmerDomain);

            expect(ormEntity).toBeInstanceOf(FarmerOrmEntity);

            expect(ormEntity.id).toBe(farmerDomain.getId());
            expect(ormEntity.name).toBe('Burue');
            expect(ormEntity.document).toBe(cleanCpf);
            expect(ormEntity.createdAt).toEqual(farmerDomain.getCreatedAt());
            expect(ormEntity.updatedAt).toEqual(farmerDomain.getUpdatedAt());
            expect(ormEntity.deletedAt).toBeNull();
        });
    });

    describe('toDomain', () => {
        it('should map a FarmerOrmEntity to a Farmer domain entity', () => {
            const now = new Date();

            const ormEntity = new FarmerOrmEntity();

            ormEntity.id = 'f2891578-97df-4ae8-aee9-18c5d23a9a71';
            ormEntity.name = 'Weme';
            ormEntity.document = cleanCpf;
            ormEntity.createdAt = now;
            ormEntity.updatedAt = now;
            ormEntity.deletedAt = null;

            const farmerDomain = FarmerMapper.toDomain(ormEntity);

            expect(farmerDomain).toBeInstanceOf(Farmer);

            expect(farmerDomain.getId()).toBe('f2891578-97df-4ae8-aee9-18c5d23a9a71');
            expect(farmerDomain.getName()).toBe('Weme');
            expect(farmerDomain.getDocument()).toBeInstanceOf(Document);
            expect(farmerDomain.getDocument().getValue()).toBe(cleanCpf);
            expect(farmerDomain.getCreatedAt()).toEqual(now);
            expect(farmerDomain.getUpdatedAt()).toEqual(now);
            expect(farmerDomain.getDeletedAt()).toBeNull();
        });
    });
});