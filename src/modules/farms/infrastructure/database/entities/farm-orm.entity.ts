import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FarmerOrmEntity } from '../../../../farmers/infrastructure/database/entities/farmer-orm.entity.js';

@Entity('farms')
export class FarmOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'farmer_id' })
  farmerId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'varchar', length: 2 })
  state: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'total_area_ha' })
  totalAreaHa: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'total_arable_area_ha',
  })
  totalArableAreaHa: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'total_vegetation_area_ha',
  })
  totalVegetationAreaHa: number;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => FarmerOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'farmer_id' })
  farmer: FarmerOrmEntity;
}
