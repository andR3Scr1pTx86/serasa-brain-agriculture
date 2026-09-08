import { Injectable } from "@nestjs/common";
import { IFarmerRepository } from "../../../domain/repositories/farmer.repository.interface.js";
import { InjectRepository } from "@nestjs/typeorm";
import { FarmerOrmEntity } from "../entities/farmer-orm.entity.js";
import { Repository } from "typeorm";
import { Document } from "../../../domain/value-objects/document.vo.js";
import { Farmer } from "../../../domain/entities/farmer.entity.js";
import { FarmerMapper } from "../mappers/farmer.mapper.js";

@Injectable()
export class OrmFarmerRepository implements IFarmerRepository {

    constructor(
        @InjectRepository(FarmerOrmEntity)
        private readonly ormRepository: Repository<FarmerOrmEntity>,
    ) { }


    async save(farmer: Farmer): Promise<void> {
        const ormEntity = FarmerMapper.toOrm(farmer);

        await this.ormRepository.save(ormEntity);
    }

    async findByDocument(document: Document): Promise<Farmer | null> {
        const ormEntity = await this.ormRepository.findOneBy({
            document: document.getValue(),
        });

        if (!ormEntity) {
            return null
        }

        return FarmerMapper.toDomain(ormEntity);
    }

    async findById(id: string): Promise<Farmer | null> {
        const ormEntity = await this.ormRepository.findOneBy({
            id
        });

        if (!ormEntity) {
            return null
        }

        return FarmerMapper.toDomain(ormEntity);
    }
}