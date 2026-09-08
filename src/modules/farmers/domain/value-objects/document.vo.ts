import { cpf, cnpj } from 'cpf-cnpj-validator'

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

        throw new Error(`Invalid document: ${document}`);
    }

    public getValue(): string {
        return this.value;
    }
}