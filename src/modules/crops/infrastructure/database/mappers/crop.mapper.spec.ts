import { describe, it, expect } from 'vitest';

import { Crop } from '../../../domain/entities/crop.entity.js';
import { CropMapper } from './crop.mapper.js';
import { CropOrmEntity } from '../entities/crop-orm.entity.js';

describe('CropMapper', () => {
  const farmId = '910a6d39-a6f0-4a4a-a0cb-e128fa01850c';

  describe('toOrm', () => {
    it('should map a Crop domain entity to a CropOrmEntity', () => {
      const cropDomain = Crop.create({
        farmId,
        cropYear: '2026',
        plantedCrop: 'Café',
      });

      const ormEntity = CropMapper.toOrm(cropDomain);

      expect(ormEntity).toBeInstanceOf(CropOrmEntity);

      expect(ormEntity.id).toBe(cropDomain.getId());
      expect(ormEntity.farmId).toBe(farmId);
      expect(ormEntity.cropYear).toBe('2026');
      expect(ormEntity.plantedCrop).toBe('Café');
      expect(ormEntity.createdAt).toEqual(cropDomain.getCreatedAt());
      expect(ormEntity.updatedAt).toEqual(cropDomain.getUpdatedAt());
    });
  });

  describe('toDomain', () => {
    it('should map a CropOrmEntity to a Crop domain entity', () => {
      const now = new Date();

      const ormEntity = new CropOrmEntity();

      ormEntity.id = 'cd33dfa2-fca1-46bd-b912-f7175a0d9732';
      ormEntity.farmId = farmId;
      ormEntity.cropYear = '2026';
      ormEntity.plantedCrop = 'Café';
      ormEntity.createdAt = now;
      ormEntity.updatedAt = now;

      const cropDomain = CropMapper.toDomain(ormEntity);

      expect(cropDomain).toBeInstanceOf(Crop);
      
      expect(cropDomain.getId()).toBe('cd33dfa2-fca1-46bd-b912-f7175a0d9732');
      expect(cropDomain.getFarmId()).toBe(farmId);
      expect(cropDomain.getCropYear()).toBe('2026');
      expect(cropDomain.getPlantedCrop()).toBe('Café');
      expect(cropDomain.getCreatedAt()).toEqual(now);
      expect(cropDomain.getUpdatedAt()).toEqual(now);
    });
  });
});