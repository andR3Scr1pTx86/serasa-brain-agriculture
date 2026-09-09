import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateFarmerRequestDto {
  @ApiProperty({
    description: 'Nome atualizado do produtor rural',
    example: 'Duiwirun',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Identificação do produtor (cpf ou cnpj) atualizado',
    example: '21843114008',
  })
  @IsString()
  @IsOptional()
  document?: string;
}
