import { describe, it, expect } from 'vitest';

import { Document } from './document.vo.js';
import { BusinessRuleError } from '../../../../shared/domain/errors/domain-errors.js';

describe('Document Value Object (VO)', () => {
    describe('create valid documents', () => {
        it('should create a valid document from a formatted CPF and strip special characters', () => {

            const input = '460.251.320-46';
            const doc = Document.create(input);

            expect(doc).toBeInstanceOf(Document);
            expect(doc.getValue()).toBe('46025132046');
        });

        it('should create a valid document from an unformatted CPF', () => {

            const input = '46025132046';
            const doc = Document.create(input);

            expect(doc).toBeInstanceOf(Document);
            expect(doc.getValue()).toBe('46025132046');
        });

        it('should create a valid document from a formatted CNPJ (traditional)', () => {

            const input = '12.345.678/0001-95';
            const doc = Document.create(input);

            expect(doc).toBeInstanceOf(Document);
            expect(doc.getValue()).toBe('12345678000195');
        });

        it('should create a valid document from an unformatted CNPJ (traditional)', () => {

            const input = '12345678000195';
            const doc = Document.create(input);

            expect(doc.getValue()).toBe('12345678000195');
        });

        it('should create a valid document from a new CNPJ (Alphanumeric)', () => {

            const input = '12.ABC.345/01DE-35';
            const doc = Document.create(input);

            expect(doc).toBeInstanceOf(Document);

            expect(doc.getValue()).toBe('12abc34501de35');
        });
    });

    describe('create invalid documents', () => {
        it('should throw BusinessRuleError for an invalid CPF', () => {
            const invalidCpf = '123.456.789-00';

            expect(() => Document.create(invalidCpf)).toThrow(BusinessRuleError);
            expect(() => Document.create(invalidCpf)).toThrow(`Invalid document: ${invalidCpf}`);
        });

        it('should throw BusinessRuleError for an invalid CNPJ', () => {
            const invalidCnpj = '00.000.000/0000-00';

            expect(() => Document.create(invalidCnpj)).toThrow(BusinessRuleError);
            expect(() => Document.create(invalidCnpj)).toThrow(`Invalid document: ${invalidCnpj}`);
        });
    });
});