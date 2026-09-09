import { Farmer } from "../../src/modules/farmers/domain/entities/farmer.entity.js";
import { Farm } from "../../src/modules/farms/domain/entities/farm.entity.js";
import { Crop } from "../../src/modules/crops/domain/entities/crop.entity.js";
import { Document } from "../../src/modules/farmers/domain/value-objects/document.vo.js";

export class TestDataFactory {
    public static createFarmer(override?: Partial<Parameters<typeof Farmer.create>[0]>): Farmer {
        return Farmer.create({
            name: 'Thanos',
            document: Document.create('134.842.490-72'),
            ...override,
        });
    }

    public static createFarm(farmerId: string, override?: Partial<Parameters<typeof Farm.create>[0]>): Farm {
        return Farm.create({
            farmerId,
            name: 'Fazenda do Multiverso',
            city: 'Palmas',
            state: 'TO',
            totalAreaHa: 1000,
            totalArableAreaHa: 700,
            totalVegetationAreaHa: 300,
            ...override,
        });
    }

    public static createCrop(farmId: string, override?: Partial<Parameters<typeof Crop.create>[0]>): Crop {
        return Crop.create({
            farmId,
            cropYear: '2026',
            plantedCrop: 'Café',
            ...override,
        });
    }
}