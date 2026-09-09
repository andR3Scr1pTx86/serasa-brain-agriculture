import { v4 as uuiv4 } from 'uuid';

import { Document } from '../value-objects/document.vo.js';

export interface FarmerProps {
  id?: string;
  name: string;
  document: Document;
  createdAt?: Date;
  updatedAt?: Date;
}

export type RestoreFarmerProps = Omit<
  FarmerProps,
  'id' | 'createdAt' | 'updatedAt'
> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export class Farmer {
  private readonly id: string;
  private name: string;
  private document: Document;
  private readonly createdAt: Date;
  private updatedAt: Date;

  private constructor(props: FarmerProps) {
    this.id = props.id ?? uuiv4();
    this.name = props.name;
    this.document = props.document;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
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

    this.name = newName;
    this.updatedAt = new Date();
  }

  public updateDocument(newDocument: Document): void {
    this.document = newDocument;
    this.updatedAt = new Date();
  }

  public delete(): void {
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
}
