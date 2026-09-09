import { IsOptional, IsString } from 'class-validator';

export class UpdateFarmerRequestDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  document?: string;
}
