import { ApiProperty } from '@nestjs/swagger';

export class StateDistributionDto {
    @ApiProperty({ example: 'SP', description: 'Sigla do estado (UF)' })
    state: string;

    @ApiProperty({ example: 12, description: 'Quantidade total de fazendas no estado' })
    count: number;
}

export class CropDistributionDto {
    @ApiProperty({ example: 'Soja', description: 'Nome da cultura plantada' })
    cropName: string;

    @ApiProperty({ example: 8, description: 'Quantidade total de cultivos desta cultura' })
    count: number;
}

export class LandUseDistributionDto {
    @ApiProperty({ example: 800, description: 'Soma total de área agricultável em hectares' })
    agriculturalArea: number;

    @ApiProperty({ example: 200, description: 'Soma total de área de vegetação em hectares' })
    vegetationArea: number;
}

export class DashboardSummaryResponseDto {
    @ApiProperty({ example: 25, description: 'Total de fazendas cadastradas' })
    totalFarms: number;

    @ApiProperty({ example: 1000, description: 'Total de hectares registrados' })
    totalHectares: number;

    @ApiProperty({
        type: [StateDistributionDto],
        description: 'Quantidade de fazendas por estado',
    })
    byState: StateDistributionDto[];

    @ApiProperty({
        type: [CropDistributionDto],
        description: 'Quantidade de fazendas por tipo de safra plantada',
    })
    byCrop: CropDistributionDto[];

    @ApiProperty({
        type: LandUseDistributionDto,
        description: 'Total de hectares entre área agricultável e vegetação',
    })
    landUse: LandUseDistributionDto;
}