import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FarmerOrmEntity } from './modules/farmers/infrastructure/database/entities/farmer-orm.entity.js';
import { FarmersModule } from './modules/farmers/farmers.module.js';
import { FarmsModule } from './modules/farms/farms.module.js';
import { FarmOrmEntity } from './modules/farms/infrastructure/database/entities/farm-orm.entity.js';
import { CropsModule } from './modules/crops/crops.module.js';
import { CropOrmEntity } from './modules/crops/infrastructure/database/entities/crop-orm.entity.js';
import { DashboardModule } from './modules/dashboard/dashboard.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'serasa-brain-agriculture',
    }),
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_DATABASE'),
        synchronize: configService.get('NODE_ENV') !== 'prod',
        entities: [FarmerOrmEntity, FarmOrmEntity, CropOrmEntity],
      }),
      inject: [ConfigService],
    }),
    FarmersModule,
    FarmsModule,
    CropsModule,
    DashboardModule,
  ],
})
export class AppModule {}
