import { describe, it, expect, beforeEach, vi, Mocked } from 'vitest';

import { DeleteFarmerUseCase } from './delete-farmer.use-case.js';
import { IFarmerRepository } from '../../domain/repositories/farmer.repository.interface.js';
import { Farmer } from '../../domain/entities/farmer.entity.js';
import { Document } from '../../domain/value-objects/document.vo.js';
import { EntityNotFoundError } from '../../../../shared/domain/errors/domain-errors.js';

describe('DeleteFarmerUseCase', () => {
  let useCase: DeleteFarmerUseCase;

  let farmerRepositoryMock: Mocked<IFarmerRepository>;

  const validCpf = '187.350.430-67';

  beforeEach(() => {
    farmerRepositoryMock = {
      save: vi.fn().mockResolvedValue(undefined),
      findById: vi.fn(),
      findByDocument: vi.fn(),
      delete: vi.fn().mockResolvedValue(undefined),
    };

    useCase = new DeleteFarmerUseCase(farmerRepositoryMock);
  });

  it('should delete farmer successfully', async () => {
    const existingFarmer = Farmer.create({
      name: 'Encleki',
      document: Document.create(validCpf),
    });

    farmerRepositoryMock.findById.mockResolvedValue(existingFarmer);

    await useCase.execute(existingFarmer.getId());

    expect(farmerRepositoryMock.findById).toHaveBeenCalledWith(existingFarmer.getId());
    expect(farmerRepositoryMock.findById).toHaveBeenCalledTimes(1);

    expect(farmerRepositoryMock.delete).toHaveBeenCalledWith(existingFarmer.getId());
    expect(farmerRepositoryMock.delete).toHaveBeenCalledTimes(1);
  });

  it('should throw EntityNotFoundError when trying to delete a non-existing farmer', async () => {
    farmerRepositoryMock.findById.mockResolvedValue(null);

    const nonExistingId = '61cf183b-d5b0-435b-829e-27f6b54a2a51';

    await expect(useCase.execute(nonExistingId)).rejects.toThrow(
      new EntityNotFoundError('Farmer not found'),
    );

    expect(farmerRepositoryMock.findById).toHaveBeenCalledWith(nonExistingId);
    expect(farmerRepositoryMock.delete).not.toHaveBeenCalled();
  });
});