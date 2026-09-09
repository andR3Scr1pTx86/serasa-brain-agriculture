import { TestDataFactory } from "../../../../../test/factories/data.factory.js";
import { BusinessRuleError } from "../../../../shared/domain/errors/domain-errors.js";

describe('Farm Entity', () => {
    it('should create a valid farm entity', () => {
        const farmerId = '84b01103-7c42-4acb-b6cd-a60e9e75bceb';

        const farm = TestDataFactory.createFarm(farmerId, {
            totalAreaHa: 1000,
            totalArableAreaHa: 600,
            totalVegetationAreaHa: 400,
        });

        expect(farm.getId()).toBeDefined();
        expect(farm.getTotalArableAreaHa() + farm.getTotalVegetationAreaHa()).toEqual(farm.getTotalAreaHa());
    });

    it('should throw BusinessRuleError when arable + vegetation area exceeds total area', () => {
        const farmerId = '84b01103-7c42-4acb-b6cd-a60e9e75bceb';

        expect(() => {
            TestDataFactory.createFarm(farmerId, {
                totalAreaHa: 1000,
                totalArableAreaHa: 800,
                totalVegetationAreaHa: 300,
            });
        }).toThrow(BusinessRuleError);
    });
});