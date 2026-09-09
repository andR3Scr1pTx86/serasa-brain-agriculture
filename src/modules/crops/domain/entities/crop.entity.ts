import { v4 as uuiv4 } from 'uuid';

export interface CropProps {
  id?: string;
  farmId: string;
  cropYear: string;
  plantedCrop: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Crop {
  private readonly id: string;
  private readonly farmId: string;
  private cropYear: string;
  private plantedCrop: string;
  private readonly createdAt: Date;
  private updatedAt: Date;

  private constructor(props: CropProps) {
    this.id = props.id ?? uuiv4();
    this.farmId = props.farmId;
    this.cropYear = props.cropYear;
    this.plantedCrop = props.plantedCrop;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  public static create(
    props: Omit<CropProps, 'id' | 'createdAt' | 'updatedAt'>,
  ): Crop {
    return new Crop(props);
  }

  public static restore(props: Required<CropProps>): Crop {
    return new Crop(props);
  }

  public getId(): string {
    return this.id;
  }

  public getFarmId(): string {
    return this.farmId;
  }

  public getCropYear(): string {
    return this.cropYear;
  }

  public getPlantedCrop(): string {
    return this.plantedCrop;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
