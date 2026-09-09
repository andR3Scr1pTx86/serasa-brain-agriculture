import { Crop } from '../../../domain/entities/crop.entity.js';
import { CropOrmEntity } from '../entities/crop-orm.entity.js';

export class CropMapper {
  public static toOrm(domain: Crop): CropOrmEntity {
    const orm = new CropOrmEntity();

    orm.id = domain.getId();
    orm.farmId = domain.getFarmId();
    orm.cropYear = domain.getCropYear();
    orm.plantedCrop = domain.getPlantedCrop();
    orm.createdAt = domain.getCreatedAt();
    orm.updatedAt = domain.getUpdatedAt();

    return orm;
  }

  public static toDomain(orm: CropOrmEntity): Crop {
    return Crop.restore({
      id: orm.id,
      farmId: orm.farmId,
      cropYear: orm.cropYear,
      plantedCrop: orm.plantedCrop,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }
}
