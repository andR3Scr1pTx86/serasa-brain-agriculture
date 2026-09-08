export interface CreateFarmerInputDto {
    name: string;
    document: string;
}

export interface CreateFarmerOutputDto {
    id: string;
    name: string;
    document: string;
    createdAt: Date;
}