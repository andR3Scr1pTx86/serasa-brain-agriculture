import { v4 as uuiv4 } from 'uuid';

import { Document } from '../value-objects/document.vo.js';

export interface FarmerProps {
  id?: string;
  name: string;
  document: Document;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type RestoreFarmerProps = Omit<
  FarmerProps,
  'id' | 'createdAt' | 'updatedAt'
> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};

export class Farmer {
  private readonly id: string;
  private name: string;
  private document: Document;
  private readonly createdAt: Date;
  private updatedAt: Date;
  private deletedAt?: Date | null;

  private constructor(props: FarmerProps) {
    this.id = props.id ?? uuiv4();
    this.name = props.name;
    this.document = props.document;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.deletedAt = props.deletedAt ?? null;
  }

  public static create(
    props: Omit<FarmerProps, 'id' | 'createdAt' | 'updatedAt'>,
  ): Farmer {
    return new Farmer(props);
  }

  public static restore(props: RestoreFarmerProps): Farmer {
    return new Farmer(props);
  }

  public updateName(newName: string): void {
    if (!newName) {
      throw new Error('Name cannot be empty');
    }

    this.name = newName.trim();
    this.updatedAt = new Date();
  }

  public updateDocument(newDocument: Document): void {
    this.document = newDocument;
    this.updatedAt = new Date();
  }

  public delete(): void {
    if (this.deletedAt) {
      throw new Error('Farmer is already deleted');
    }

    this.deletedAt = new Date();
    this.updatedAt = new Date();
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDocument(): Document {
    return this.document;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getDeletedAt(): Date | null | undefined {
    return this.deletedAt;
  }
}
