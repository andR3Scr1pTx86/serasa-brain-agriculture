import { describe, it, expect } from 'vitest';

import { Document } from '../value-objects/document.vo.js';
import { Farmer } from './farmer.entity.js';

describe('Farmer Entity', () => {
    const createMockDocument = (val = '553.249.320-00') => ({
        getValue: () => val,
    }) as Document;

    describe('create', () => {
        it('should create a new Farmer', () => {
            const doc = createMockDocument();

            const farmer = Farmer.create({
                name: 'Rogor',
                document: doc,
            });

            expect(farmer.getId()).toBeDefined();
            expect(typeof farmer.getId()).toBe('string');

            expect(farmer.getName()).toBe('Rogor');
            expect(farmer.getDocument()).toBe(doc);
            expect(farmer.getCreatedAt()).toBeInstanceOf(Date);
            expect(farmer.getUpdatedAt()).toBeInstanceOf(Date);
        });
    });

    describe('restore', () => {
        it('should restore an existing Farmer', () => {
            const fixedId = '467d61a6-1559-42fd-9c83-4f6e387a7ba0';
            const fixedDate = new Date('2025-01-01T10:00:00Z');

            const doc = createMockDocument();

            const farmer = Farmer.restore({
                id: fixedId,
                name: 'Samus',
                document: doc,
                createdAt: fixedDate,
                updatedAt: fixedDate
            });

            expect(farmer.getId()).toBe(fixedId);
            expect(farmer.getName()).toBe('Samus');
            expect(farmer.getCreatedAt()).toEqual(fixedDate);
            expect(farmer.getUpdatedAt()).toEqual(fixedDate);
        });
    });

    describe('updateName', () => {
        it('should update name and refresh updatedAt', () => {
            const farmer = Farmer.create({
                name: 'Lecus',
                document: createMockDocument(),
            });

            const initialUpdatedAt = farmer.getUpdatedAt();

            farmer.updateName('Xuxor');

            expect(farmer.getName()).toBe('Xuxor');
            expect(farmer.getUpdatedAt().getTime()).toBeGreaterThanOrEqual(initialUpdatedAt.getTime());
        });

        it('should throw an error when trying to set an empty name', () => {
            const farmer = Farmer.create({
                name: 'Lecus',
                document: createMockDocument(),
            });

            expect(() => farmer.updateName('')).toThrow('Name cannot be empty');
        });
    });

    describe('updateDocument', () => {
        it('should update document and refresh updatedAt', () => {
            const initialDoc = createMockDocument('27664361036');
            const newDoc = createMockDocument('71855442035');

            const farmer = Farmer.create({
                name: 'Lecus',
                document: initialDoc,
            });

            farmer.updateDocument(newDoc);

            expect(farmer.getDocument().getValue()).toBe('71855442035');
        });
    });
});