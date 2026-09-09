import { Crop } from '../entities/crop.entity.js';

export interface ICropRepository {
  save(crop: Crop): Promise<void>;
  findById(id: string): Promise<Crop | null>;
}

export const CROP_REPOSITORY_TOKEN = Symbol('ICropRepository');
