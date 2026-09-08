export interface CreateCropInputDto {
  farmId: string;
  cropYear: string;
  plantedCrop: string;
}

export interface CreateCropOutputDto {
  id: string;
  farmId: string;
  cropYear: string;
  plantedCrop: string;
  createdAt: Date;
}