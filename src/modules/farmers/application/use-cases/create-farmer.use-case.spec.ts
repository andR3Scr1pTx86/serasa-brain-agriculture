import { Mocked } from "vitest";

import { CreateFarmerUseCase } from "./create-farmer.use-case.js";
import { IFarmerRepository } from "../../domain/repositories/farmer.repository.interface.js";
import { Farmer } from "../../domain/entities/farmer.entity.js";
import { Document } from "../../domain/value-objects/document.vo.js";
import { EntityNotFoundError } from "../../../../shared/domain/errors/domain-errors.js";

describe('CreateFarmerUseCase', () => {
    let useCase: CreateFarmerUseCase;

    let farmerRepositoryMock: Mocked<IFarmerRepository>;

    const validCpf = '460.251.320-46';
    const cleanCpf = '46025132046';

    beforeEach(() => {
        farmerRepositoryMock = {
            save: vi.fn().mockResolvedValue(undefined),
            findById: vi.fn(),
            findByDocument: vi.fn(),
            delete: vi.fn().mockResolvedValue(undefined),
        };

        useCase = new CreateFarmerUseCase(farmerRepositoryMock);
    });

    it('should create a farmer successfully', async () => {
        farmerRepositoryMock.findByDocument.mockResolvedValue(null);

        const input = {
            name: 'Dikios',
            document: validCpf,
        };

        const output = await useCase.execute(input);

        expect(output).toBeDefined();
        expect(output.id).toBeDefined();

        expect(output.name).toBe('Dikios');
        expect(output.document).toBe(cleanCpf);
        expect(output.createdAt).toBeInstanceOf(Date);

        expect(farmerRepositoryMock.findByDocument).toHaveBeenCalledTimes(1);
        expect(farmerRepositoryMock.save).toHaveBeenCalledTimes(1);
    });

    it('should throw EntityNotFoundError when farmer already exists with the same document', async () => {
        const existingFarmer = Farmer.create({
            name: 'Dikios',
            document: Document.create(validCpf),
        });

        farmerRepositoryMock.findByDocument.mockResolvedValue(existingFarmer);

        const input = {
            name: 'Suluy',
            document: validCpf,
        };


        await expect(useCase.execute(input)).rejects.toThrow(
            new EntityNotFoundError('Farmer already exists with this document'),
        );

        expect(farmerRepositoryMock.findByDocument).toHaveBeenCalledTimes(1);
        expect(farmerRepositoryMock.save).not.toHaveBeenCalled();
    });
});