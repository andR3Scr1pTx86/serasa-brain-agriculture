import { Farmer } from "../../../domain/entities/farmer.entity.js";
import { Document } from "../../../domain/value-objects/document.vo.js";
import { FarmerOrmEntity } from "../entities/farmer-orm.entity.js";

export class FarmerMapper {

    public static toOrm(domain: Farmer): FarmerOrmEntity {
        const orm = new FarmerOrmEntity();

        orm.id = domain.getId();
        orm.name = domain.getName();
        orm.document = domain.getDocument().getValue();
        orm.createdAt = domain.getCreatedAt();
        orm.updatedAt = domain.getUpdatedAt();
        orm.deletedAt = domain.getDeletedAt();

        return orm;
    }

    public static toDomain(orm: FarmerOrmEntity): Farmer {
        return Farmer.restore({
            id: orm.id,
            name: orm.name,
            document: Document.create(orm.document),
            createdAt: orm.createdAt,
            updatedAt: orm.updatedAt,
            deletedAt: orm.deletedAt,
        });
    }

}