import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';

import { clearDatabase, TestDataSource } from '../../../../../../test/helpers/database.helper.js';
import { Farmer } from '../../../domain/entities/farmer.entity.js';
import { Document } from '../../../domain/value-objects/document.vo.js';
import { FarmerOrmRepository } from './farmer-orm.repository.js';
import { FarmerOrmEntity } from '../entities/farmer-orm.entity.js';

describe('FarmerOrmRepository (Integration)', () => {
  let repository: FarmerOrmRepository;

  beforeAll(async () => {
    await TestDataSource.initialize();

    const ormRepository = TestDataSource.getRepository(FarmerOrmEntity);
    repository = new FarmerOrmRepository(ormRepository);
  });

  afterAll(async () => {
    await TestDataSource.destroy();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  it('should save a new farmer into PostgreSQL and find it by id', async () => {
    const farmer = Farmer.create({
      name: 'Lyafo',
      document: Document.create('269.914.900-40'),
    });

    await repository.save(farmer);

    const foundFarmer = await repository.findById(farmer.getId());

    expect(foundFarmer).not.toBeNull();
    expect(foundFarmer?.getId()).toBe(farmer.getId());
    expect(foundFarmer?.getName()).toBe('Lyafo');
    expect(foundFarmer?.getDocument().getValue()).toBe('26991490040');
  });

  it('should find a farmer by Document Value Object', async () => {
    const documentVo = Document.create('269.914.900-40');

    const farmer = Farmer.create({
      name: 'Lyafo',
      document: documentVo,
    });

    await repository.save(farmer);

    const foundFarmer = await repository.findByDocument(documentVo);

    expect(foundFarmer).not.toBeNull();
    expect(foundFarmer?.getId()).toBe(farmer.getId());
  });

  it('should perform soft delete when delete method is called', async () => {
    const farmer = Farmer.create({
      name: 'Lyafo',
      document: Document.create('269.914.900-40'),
    });

    await repository.save(farmer);
    await repository.delete(farmer.getId());

    const foundFarmer = await repository.findById(farmer.getId());
    
    expect(foundFarmer).toBeNull();
  });
});