import { Farmer } from "../entities/farmer.entity.js";
import { Document } from "../value-objects/document.vo.js";

export interface IFarmerRepository {
    save(farmer: Farmer): Promise<void>
    findByDocument(document: Document): Promise<Farmer | null>
}

export const FARMER_REPOSITORY_TOKEN = Symbol('IFarmerRepository')