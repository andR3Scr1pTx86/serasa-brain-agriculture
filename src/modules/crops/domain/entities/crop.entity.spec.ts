import { describe, it, expect } from 'vitest';

import { Crop } from './crop.entity.js';

describe('Crop Entity', () => {
  const farmId = '910a6d39-a6f0-4a4a-a0cb-e128fa01850c';

  describe('create', () => {
    it('should create a valid Crop entity', () => {
      const crop = Crop.create({
        farmId,
        cropYear: '2026',
        plantedCrop: 'Café',
      });

      expect(crop.getId()).toBeDefined();
      expect(typeof crop.getId()).toBe('string');

      expect(crop.getFarmId()).toBe(farmId);
      expect(crop.getCropYear()).toBe('2026');
      expect(crop.getPlantedCrop()).toBe('Café');
      expect(crop.getCreatedAt()).toBeInstanceOf(Date);
      expect(crop.getUpdatedAt()).toBeInstanceOf(Date);
    });
  });

  describe('restore', () => {
    it('should restore an existing Crop entity', () => {
      const fixedId = '29415db6-41fa-438f-ad07-45926b72a342';
      const fixedDate = new Date('2026-01-01T10:00:00Z');

      const crop = Crop.restore({
        id: fixedId,
        farmId,
        cropYear: '2026',
        plantedCrop: 'Café',
        createdAt: fixedDate,
        updatedAt: fixedDate,
      });

      expect(crop.getId()).toBe(fixedId);
      expect(crop.getFarmId()).toBe(farmId);
      expect(crop.getCropYear()).toBe('2026');
      expect(crop.getPlantedCrop()).toBe('Café');
      expect(crop.getCreatedAt()).toEqual(fixedDate);
      expect(crop.getUpdatedAt()).toEqual(fixedDate);
    });
  });
});