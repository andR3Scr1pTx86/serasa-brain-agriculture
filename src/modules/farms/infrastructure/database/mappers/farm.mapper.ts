import { Farm } from '../../../domain/entities/farm.entity.js';
import { FarmOrmEntity } from '../entities/farm-orm.entity.js';

export class FarmMapper {
  public static toOrm(domain: Farm): FarmOrmEntity {
    const orm = new FarmOrmEntity();

    orm.id = domain.getId();
    orm.farmerId = domain.getFarmerId();
    orm.name = domain.getName();
    orm.city = domain.getCity();
    orm.state = domain.getState();
    orm.totalAreaHa = domain.getTotalAreaHa();
    orm.totalArableAreaHa = domain.getTotalArableAreaHa();
    orm.totalVegetationAreaHa = domain.getTotalVegetationAreaHa();
    orm.createdAt = domain.getCreatedAt();
    orm.updatedAt = domain.getUpdatedAt();

    return orm;
  }

  public static toDomain(orm: FarmOrmEntity): Farm {
    return Farm.restore({
      id: orm.id,
      farmerId: orm.farmerId,
      name: orm.name,
      city: orm.city,
      state: orm.state,
      totalAreaHa: Number(orm.totalAreaHa),
      totalArableAreaHa: Number(orm.totalArableAreaHa),
      totalVegetationAreaHa: Number(orm.totalVegetationAreaHa),
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }
}
