import { ApiProperty } from "@nestjs/swagger";

export class CreateCropResponseDto {
    @ApiProperty({ example: 'e8a705ed-619e-4265-bb04-06c60ecbeafd' })
    id: string;

    @ApiProperty({ example: '6d51716a-1d41-47a0-bbb0-fa704cdf8671' })
    farmId: string;

    @ApiProperty({ example: '2026' })
    cropYear: string;

    @ApiProperty({ example: 'Café' })
    plantedCrop: string;

    @ApiProperty({ example: '2026-09-09T02:00:00.000Z' })
    createdAt: Date;
}