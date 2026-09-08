import { IsNotEmpty, IsNumberString, IsString, IsUUID, Length } from "class-validator";

export class CreateCropRequestDto {
  @IsUUID('4')
  @IsNotEmpty()
  farmId: string;

  @IsString()
  @IsNumberString()
  @Length(4, 4)
  cropYear: string;

  @IsString()
  @IsNotEmpty()
  plantedCrop: string;
}