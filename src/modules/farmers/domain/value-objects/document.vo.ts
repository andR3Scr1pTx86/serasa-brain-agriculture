import { cpf, cnpj } from 'cpf-cnpj-validator'
import { BusinessRuleError } from '../../../../shared/domain/errors/domain-errors.js';

export class Document {
    private readonly value: string;

    private constructor(document: string) {
        this.value = document.toLowerCase().trim();
    }

    public static create(document: string): Document {
        if (cpf.isValid(document)) {
            return new Document(cpf.strip(document));
        }

        if (cnpj.isValid(document)) {
            return new Document(cnpj.strip(document));
        }

        throw new BusinessRuleError(`Invalid document: ${document}`);
    }

    public getValue(): string {
        return this.value;
    }
}