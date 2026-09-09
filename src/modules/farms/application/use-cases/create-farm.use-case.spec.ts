import { describe, it, expect, beforeEach, vi, Mocked } from 'vitest';

import { CreateFarmUseCase } from './create-farm.use-case.js';
import { IFarmRepository } from '../../domain/repositories/farm.repository.interface.js';
import { IFarmerRepository } from '../../../farmers/domain/repositories/farmer.repository.interface.js';
import { TestDataFactory } from '../../../../../test/factories/data.factory.js';
import { EntityNotFoundError } from '../../../../shared/domain/errors/domain-errors.js';

describe('CreateFarmUseCase', () => {
    let useCase: CreateFarmUseCase;

    let farmRepositoryMock: Mocked<IFarmRepository>;
    let farmerRepositoryMock: Mocked<IFarmerRepository>;

    beforeEach(() => {
        farmRepositoryMock = {
            save: vi.fn().mockResolvedValue(undefined),
            findById: vi.fn(),
        };

        farmerRepositoryMock = {
            save: vi.fn().mockResolvedValue(undefined),
            findByDocument: vi.fn(),
            findById: vi.fn(),
            delete: vi.fn().mockResolvedValue(undefined),
        };

        useCase = new CreateFarmUseCase(farmRepositoryMock, farmerRepositoryMock);
    });

    it('should create a farm successfully', async () => {
        const mockFarmer = TestDataFactory.createFarmer();

        farmerRepositoryMock.findById.mockResolvedValue(mockFarmer);

        const input = {
            farmerId: mockFarmer.getId(),
            name: 'Fazenda Vista Linda',
            city: 'Três Corações',
            state: 'MG',
            totalAreaHa: 500,
            totalArableAreaHa: 300,
            totalVegetationAreaHa: 200,
        };

        const output = await useCase.execute(input);

        expect(output).toBeDefined();
        expect(farmerRepositoryMock.findById).toHaveBeenCalledWith(input.farmerId);
        expect(farmRepositoryMock.save).toHaveBeenCalledTimes(1);
    });

    it('should throw EntityNotFoundError when farmer does not exist', async () => {
        farmerRepositoryMock.findById.mockResolvedValue(null);

        const input = {
            farmerId: '84b01103-7c42-4acb-b6cd-a60e9e75bceb',
            name: 'Fazenda Vista Linda',
            city: 'Três Corações',
            state: 'MG',
            totalAreaHa: 500,
            totalArableAreaHa: 300,
            totalVegetationAreaHa: 200,
        };

        await expect(useCase.execute(input)).rejects.toThrow(
            new EntityNotFoundError('Farmer not found'),
        );

        expect(farmerRepositoryMock.findById).toHaveBeenCalledWith('84b01103-7c42-4acb-b6cd-a60e9e75bceb');
        expect(farmerRepositoryMock.findById).toHaveBeenCalledTimes(1);
        expect(farmRepositoryMock.save).not.toHaveBeenCalled();
    });
});