import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFarmerRequestDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    document: string;
}