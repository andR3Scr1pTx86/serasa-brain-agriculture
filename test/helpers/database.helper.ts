import { DataSource } from 'typeorm';

import { FarmerOrmEntity } from '../../src/modules/farmers/infrastructure/database/entities/farmer-orm.entity.js';
import { FarmOrmEntity } from '../../src/modules/farms/infrastructure/database/entities/farm-orm.entity.js';
import { CropOrmEntity } from '../../src/modules/crops/infrastructure/database/entities/crop-orm.entity.js';

export const TestDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    entities: [FarmerOrmEntity, FarmOrmEntity, CropOrmEntity],
    synchronize: true,
    logging: false,
});

export async function clearDatabase() {
    const entities = TestDataSource.entityMetadatas;

    for (const entity of entities) {
        const repository = TestDataSource.getRepository(entity.name);
        await repository.query(`TRUNCATE TABLE "${entity.tableName}" CASCADE;`);
    }
}