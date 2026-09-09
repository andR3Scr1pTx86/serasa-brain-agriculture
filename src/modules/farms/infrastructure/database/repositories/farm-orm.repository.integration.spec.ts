import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { FarmOrmRepository } from './farm-orm.repository.js';
import { FarmerOrmRepository } from '../../../../farmers/infrastructure/database/repositories/farmer-orm.repository.js';
import { clearDatabase, TestDataSource } from '../../../../../../test/helpers/database.helper.js';
import { Farmer } from '../../../../farmers/domain/entities/farmer.entity.js';
import { Farm } from '../../../domain/entities/farm.entity.js';
import { Document } from '../../../../farmers/domain/value-objects/document.vo.js';

describe('FarmOrmRepository (Integration)', () => {
  let farmRepository: FarmOrmRepository;
  let farmerRepository: FarmerOrmRepository;

  beforeAll(async () => {
    await TestDataSource.initialize();

    farmRepository = new FarmOrmRepository(TestDataSource.getRepository('FarmOrmEntity'));
    farmerRepository = new FarmerOrmRepository(TestDataSource.getRepository('FarmerOrmEntity'));
  });

  afterAll(async () => {
    await TestDataSource.destroy();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  it('should save a farm linked to a farmer and retrieve decimal areas as numbers', async () => {
  
    const farmer = Farmer.create({
      name: 'Lyafo',
      document: Document.create('269.914.900-40'),
    });

    await farmerRepository.save(farmer);

    const farm = Farm.create({
      farmerId: farmer.getId(),
      name: 'Fazenda Ovelha Feliz',
      city: 'Ribeirão Preto',
      state: 'SP',
      totalAreaHa: 500,
      totalArableAreaHa: 300,
      totalVegetationAreaHa: 200,
    });
    await farmRepository.save(farm);


    const foundFarm = await farmRepository.findById(farm.getId());

    expect(foundFarm).not.toBeNull();
    expect(foundFarm?.getId()).toBe(farm.getId());
    expect(foundFarm?.getFarmerId()).toBe(farmer.getId());
    expect(foundFarm?.getTotalAreaHa()).toBe(500);
    expect(typeof foundFarm?.getTotalAreaHa()).toBe('number');
  });
});