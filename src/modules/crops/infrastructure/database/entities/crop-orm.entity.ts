import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { FarmOrmEntity } from "../../../../farms/infrastructure/database/entities/farm-orm.entity.js";

@Entity('crops')
export class CropOrmEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ type: 'uuid', name: 'farm_id' })
    farmId: string;

    @Column({ type: 'varchar', length: 50, name: 'crop_year' })
    cropYear: string;

    @Column({ type: 'varchar', length: 100, name: 'planted_crop' })
    plantedCrop: string;

    @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => FarmOrmEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'farm_id' })
    farm: FarmOrmEntity;
}