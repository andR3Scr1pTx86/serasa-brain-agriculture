import { Farm } from '../entities/farm.entity.js';

export interface IFarmRepository {
  save(farm: Farm): Promise<void>;
  findById(id: string): Promise<Farm | null>;
}

export const FARM_REPOSITORY_TOKEN = Symbol('IFarmRepository');
