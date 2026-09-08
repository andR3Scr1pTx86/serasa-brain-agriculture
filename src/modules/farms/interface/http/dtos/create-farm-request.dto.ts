import { IsNotEmpty, IsNumber, IsString, IsUUID, Length, Min } from "class-validator";

export class CreateFarmRequestDto {
    @IsUUID('4')
    @IsNotEmpty()
    farmerId: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @Length(2, 2)
    state: string;

    @IsNumber()
    @Min(0)
    totalAreaHa: number;

    @IsNumber()
    @Min(0)
    totalArableAreaHa: number;

    @IsNumber()
    @Min(0)
    totalVegetationAreaHa: number;
}