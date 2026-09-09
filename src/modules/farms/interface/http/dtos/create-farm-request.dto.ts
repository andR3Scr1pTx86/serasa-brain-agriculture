import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Length,
  Min,
} from 'class-validator';

export class CreateFarmRequestDto {
  @ApiProperty({
    description: 'Id do produtor rural (uuidv4)',
    example: '96af0787-1628-48c9-9f02-0ca6ee2346ef',
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
}
