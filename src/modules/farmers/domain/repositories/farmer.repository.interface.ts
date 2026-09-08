import { Farmer } from "../entities/farmer.entity.js";
import { Document } from "../value-objects/document.vo.js";

export interface IFarmerRepository {
    save(farmer: Farmer): Promise<void>
    findByDocument(document: Document): Promise<Farmer | null>
    findById(id: string): Promise<Farmer | null>
    delete(id: string): Promise<void>
}

export const FARMER_REPOSITORY_TOKEN = Symbol('IFarmerRepository')