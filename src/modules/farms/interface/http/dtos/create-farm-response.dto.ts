import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsNumber,
    IsString,
    IsUUID,
    Length,
    Min,
} from 'class-validator';

export class CreateFarmResponseDto {
    @ApiProperty({ example: 'dd3857b2-922a-4415-9014-a07ff77b836e' })
    id: string;

    @ApiProperty({
        description: 'Id do produtor rural (uuidv4)',
        example: '78fb5b85-db7b-4f4c-bd55-6fd45d5ad279',
    })
    @IsUUID('4')
    @IsNotEmpty()
    farmerId: string;

    @ApiProperty({
        description: 'Nome da fazenda',
        example: 'Fazendinha Feliz',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Cidade em que a fazenda está localizada',
        example: 'Três Corações',
    })
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty({
        description: 'Estado em que a fazenda está localizada',
        example: 'MG',
    })
    @IsString()
    @Length(2, 2)
    state: string;

    @ApiProperty({
        description: 'Área total da fazenda (em hectares)',
        example: '1000',
    })
    @IsNumber()
    @Min(0)
    totalAreaHa: number;

    @ApiProperty({
        description: 'Área agricultável da fazenda (em hectares)',
        example: '900',
    })
    @IsNumber()
    @Min(0)
    totalArableAreaHa: number;

    @ApiProperty({
        description: 'Área de vegetação da fazenda (em hectares)',
        example: '100',
    })
    @IsNumber()
    @Min(0)
    totalVegetationAreaHa: number;

    @ApiProperty({ example: '2026-09-09T02:00:00.000Z' })
    createdAt: Date;
}

