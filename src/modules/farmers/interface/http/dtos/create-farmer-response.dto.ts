import { ApiProperty } from '@nestjs/swagger';

export class CreateFarmerResponseDto {
    @ApiProperty({ example: 'ee419d21-a4bc-447a-9923-31f426c63067' })
    id: string;

    @ApiProperty({ example: 'Fepul' })
    name: string;

    @ApiProperty({ example: '21843114008' })
    document: string;

    @ApiProperty({ example: '2026-09-09T17:46:00.000Z' })
    createdAt: Date;
}