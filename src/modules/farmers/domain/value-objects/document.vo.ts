import { cpf, cnpj } from 'cpf-cnpj-validator'

export class Document {
    private readonly value: string;

    private constructor(document: string) {
        this.value = document.toLowerCase().trim();
    }

    public static create(document: string): Document {
        if (!this.validate(document)) {
            throw new Error(`Invalid document: ${document}`);
        }

        return new Document(document);
    }

    private static validate(document: string): boolean {
        return cpf.isValid(document) || cnpj.isValid(document)
    }

    public getValue(): string {
        return this.value;
    }
}