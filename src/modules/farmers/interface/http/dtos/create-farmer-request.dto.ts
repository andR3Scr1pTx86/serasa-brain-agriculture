import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFarmerRequestDto {
  @ApiProperty({
    description: 'Nome do produtor rural',
    example: 'Fepul',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Identificação do produtor (cpf ou cnpj)',
    example: '70456427090',
  })
  @IsString()
  @IsNotEmpty()
  document: string;
}
