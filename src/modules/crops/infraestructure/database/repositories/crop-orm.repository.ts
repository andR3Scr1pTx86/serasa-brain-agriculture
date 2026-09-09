import { Injectable } from "@nestjs/common";
import { ICropRepository } from "../../../domain/repositories/crop.repository.interface.js";
import { InjectRepository } from "@nestjs/typeorm";
import { CropOrmEntity } from "../entities/crop-orm.entity.js";
import { Repository } from "typeorm";
import { Crop } from "../../../domain/entities/crop.entity.js";
import { CropMapper } from "../mappers/crop.mapper.js";

@Injectable()
export class CropOrmRepository implements ICropRepository {
    constructor(
        @InjectRepository(CropOrmEntity)
        private readonly ormRepository: Repository<CropOrmEntity>,
    ) { }

    async save(crop: Crop): Promise<void> {
        const ormEntity = CropMapper.toOrm(crop);

        await this.ormRepository.save(ormEntity);
    }

    async findById(id: string): Promise<Crop | null> {
        const ormEntity = await this.ormRepository.findOneBy({ id });

        if (!ormEntity) return null;

        return CropMapper.toDomain(ormEntity);
    }
}