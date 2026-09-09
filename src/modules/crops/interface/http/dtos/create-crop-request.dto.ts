import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateCropRequestDto {
  @ApiProperty({
    description: 'Id da fazenda (uuidv4)',
    example: '6d51716a-1d41-47a0-bbb0-fa704cdf8671',
  })
  @IsUUID('4')
  @IsNotEmpty()
  farmId: string;

  @ApiProperty({
    description: 'Ano da safra',
    example: '2026',
  })
  @IsString()
  @IsNumberString()
  @Length(4, 4)
  cropYear: string;

  @ApiProperty({
    description: 'Cultura plantada',
    example: 'Café',
  })
  @IsString()
  @IsNotEmpty()
  plantedCrop: string;
}
