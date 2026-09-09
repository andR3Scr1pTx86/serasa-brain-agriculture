export interface StateDistribution {
  state: string;
  count: number;
}

export interface CropDistribution {
  cropName: string;
  count: number;
}

export interface LandUseDistribution {
  agriculturalArea: number;
  vegetationArea: number;
}

export interface DashboardSummaryOutputDto {
  totalFarms: number;
  totalHectares: number;
  byState: StateDistribution[];
  byCrop: CropDistribution[];
  landUse: LandUseDistribution;
}
