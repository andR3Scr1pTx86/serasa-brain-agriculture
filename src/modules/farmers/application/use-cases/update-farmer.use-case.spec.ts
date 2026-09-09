import { describe, it, expect, beforeEach, vi, Mocked } from 'vitest';

import { UpdateFarmerUseCase } from './update-farmer.use-case.js';
import { IFarmerRepository } from '../../domain/repositories/farmer.repository.interface.js';
import { Farmer } from '../../domain/entities/farmer.entity.js';
import { Document } from '../../domain/value-objects/document.vo.js';
import { ConflictError, EntityNotFoundError } from '../../../../shared/domain/errors/domain-errors.js';


describe('UpdateFarmerUseCase', () => {
    let useCase: UpdateFarmerUseCase;

    let farmerRepositoryMock: Mocked<IFarmerRepository>;

    const initialCpf = '866.264.110-55';

    const newCpf = '997.414.980-04';
    const cleanNewCpf = '99741498004';

    beforeEach(() => {
        farmerRepositoryMock = {
            save: vi.fn().mockResolvedValue(undefined),
            findById: vi.fn(),
            findByDocument: vi.fn(),
            delete: vi.fn().mockResolvedValue(undefined),
        };

        useCase = new UpdateFarmerUseCase(farmerRepositoryMock);
    });

    it('should update farmer name successfully', async () => {
        const existingFarmer = Farmer.create({
            name: 'Ruhar',
            document: Document.create(initialCpf),
        });

        farmerRepositoryMock.findById.mockResolvedValue(existingFarmer);

        const input = {
            id: existingFarmer.getId(),
            name: 'Doeus',
        };

        const output = await useCase.execute(input);

        expect(output.name).toBe('Doeus');

        expect(farmerRepositoryMock.findById).toHaveBeenCalledWith(existingFarmer.getId());
        expect(farmerRepositoryMock.findByDocument).not.toHaveBeenCalled();
        expect(farmerRepositoryMock.save).toHaveBeenCalledWith(existingFarmer);
    });

    it('should update farmer document successfully', async () => {
        const existingFarmer = Farmer.create({
            name: 'Ruhar',
            document: Document.create(initialCpf),
        });

        farmerRepositoryMock.findById.mockResolvedValue(existingFarmer);
        farmerRepositoryMock.findByDocument.mockResolvedValue(null);

        const input = {
            id: existingFarmer.getId(),
            document: newCpf,
        };

        const output = await useCase.execute(input);

        expect(output.document).toBe(cleanNewCpf);

        expect(farmerRepositoryMock.findByDocument).toHaveBeenCalledTimes(1);
        expect(farmerRepositoryMock.save).toHaveBeenCalledTimes(1);
    });

    it('should throw EntityNotFoundError when farmer does not exist', async () => {
        farmerRepositoryMock.findById.mockResolvedValue(null);

        const input = {
            id: '4e37c5a7-a504-4765-a5e7-b49b400a712c',
            name: 'Ruhar',
        };

        await expect(useCase.execute(input)).rejects.toThrow(
            new EntityNotFoundError('Farmer not found'),
        );

        expect(farmerRepositoryMock.save).not.toHaveBeenCalled();
    });

    it('should throw ConflictError when new document is already in use by another farmer', async () => {
        const existingFarmer = Farmer.create({
            name: 'Ruhar',
            document: Document.create(initialCpf),
        });

        const otherFarmer = Farmer.create({
            name: 'Doeus',
            document: Document.create(newCpf),
        });

        farmerRepositoryMock.findById.mockResolvedValue(existingFarmer);
        farmerRepositoryMock.findByDocument.mockResolvedValue(otherFarmer);

        const input = {
            id: existingFarmer.getId(),
            document: newCpf,
        };

        await expect(useCase.execute(input)).rejects.toThrow(
            new ConflictError('This Document is already in use by another Farmer'),
        );

        expect(farmerRepositoryMock.save).not.toHaveBeenCalled();
    });
});