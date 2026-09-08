import { Injectable } from "@nestjs/common";
import { IFarmRepository } from "../../../domain/repositories/farm.repository.interface.js";
import { InjectRepository } from "@nestjs/typeorm";
import { FarmOrmEntity } from "../entities/farm-orm.entity.js";
import { Repository } from "typeorm";
import { Farm } from "../../../domain/entities/farm.entity.js";
import { FarmMapper } from "../mappers/farm.mapper.js";

@Injectable()
export class OrmFarmRepository implements IFarmRepository {

    constructor(
        @InjectRepository(FarmOrmEntity)
        private readonly ormRepository: Repository<FarmOrmEntity>,
    ) { }

    async save(farm: Farm): Promise<void> {
        const ormEntity = FarmMapper.toOrm(farm);

        await this.ormRepository.save(ormEntity);
    }

    async findById(id: string): Promise<Farm | null> {
        const ormEntity = await this.ormRepository.findOneBy({ id });

        if (!ormEntity) return null;

        return FarmMapper.toDomain(ormEntity);
    }
}