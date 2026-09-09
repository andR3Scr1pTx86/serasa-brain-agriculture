import { describe, it, expect, beforeEach, vi, Mocked } from 'vitest';

import { CreateCropUseCase } from './create-crop.use-case.js';
import { ICropRepository } from '../../domain/repositories/crop.repository.interface.js';
import { IFarmRepository } from '../../../farms/domain/repositories/farm.repository.interface.js';
import { TestDataFactory } from '../../../../../test/factories/data.factory.js';
import { EntityNotFoundError } from '../../../../shared/domain/errors/domain-errors.js';

describe('CreateCropUseCase', () => {
  let useCase: CreateCropUseCase;

  let cropRepositoryMock: Mocked<ICropRepository>;
  let farmRepositoryMock: Mocked<IFarmRepository>;

  beforeEach(() => {
    cropRepositoryMock = {
      save: vi.fn().mockResolvedValue(undefined),
      findById: vi.fn(),
    };

    farmRepositoryMock = {
      save: vi.fn().mockResolvedValue(undefined),
      findById: vi.fn(),
    };

    useCase = new CreateCropUseCase(cropRepositoryMock, farmRepositoryMock);
  });

  it('should create a crop successfully', async () => {
    const mockFarm = TestDataFactory.createFarm('a43cab91-fce7-424a-b945-2064b20d5221');

    farmRepositoryMock.findById.mockResolvedValue(mockFarm);

    const input = {
      farmId: mockFarm.getId(),
      cropYear: '2026',
      plantedCrop: 'Café',
    };

    const output = await useCase.execute(input);

    expect(output).toBeDefined();

    expect(output.id).toBeDefined();
    expect(output.farmId).toBe(mockFarm.getId());
    expect(output.cropYear).toBe('2026');
    expect(output.plantedCrop).toBe('Café');
    expect(output.createdAt).toBeInstanceOf(Date);

    expect(farmRepositoryMock.findById).toHaveBeenCalledWith(mockFarm.getId());

    expect(farmRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(cropRepositoryMock.save).toHaveBeenCalledTimes(1);
  });

  it('should throw EntityNotFoundError when farm does not exist', async () => {
    farmRepositoryMock.findById.mockResolvedValue(null);

    const input = {
      farmId: 'a43cab91-fce7-424a-b945-2064b20d5221',
      cropYear: '2026',
      plantedCrop: 'Café',
    };

    await expect(useCase.execute(input)).rejects.toThrow(
      new EntityNotFoundError('Farm not found'),
    );

    expect(farmRepositoryMock.findById).toHaveBeenCalledWith('a43cab91-fce7-424a-b945-2064b20d5221');
    expect(cropRepositoryMock.save).not.toHaveBeenCalled();
  });
});