export interface CreateFarmInputDto {
  farmerId: string;
  name: string;
  city: string;
  state: string;
  totalAreaHa: number;
  totalArableAreaHa: number;
  totalVegetationAreaHa: number;
}

export interface CreateFarmOutputDto {
  id: string;
  farmerId: string;
  name: string;
  city: string;
  state: string;
  totalAreaHa: number;
  totalArableAreaHa: number;
  totalVegetationAreaHa: number;
  createdAt: Date;
}
