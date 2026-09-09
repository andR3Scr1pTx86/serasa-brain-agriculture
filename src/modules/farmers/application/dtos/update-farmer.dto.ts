export interface UpdateFarmerInputDto {
  id: string;
  name?: string;
  document?: string;
}

export interface UpdateFarmerOutputDto {
  id: string;
  name: string;
  document: string;
  updatedAt: Date;
}
