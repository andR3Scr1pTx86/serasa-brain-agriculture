import { describe, it, expect, beforeEach, vi, Mocked } from 'vitest';

import { GetDashboardSummaryUseCase } from './get-dashboard-summary.use-case.js';
import { IDashboardRepository } from '../../domain/repositories/dashboard.repository.interface.js';
import { DashboardSummaryOutputDto } from '../dtos/dashboard-summary.dto.js';

describe('GetDashboardSummaryUseCase', () => {
  let useCase: GetDashboardSummaryUseCase;

  let dashboardRepositoryMock: Mocked<IDashboardRepository>;

  const mockSummaryData: DashboardSummaryOutputDto = {
    totalFarms: 5,
    totalHectares: 2500,
    landUse: {
      agriculturalArea: 1800,
      vegetationArea: 700,
    },
    byState: [
      { state: 'SP', count: 3 },
      { state: 'MT', count: 2 },
    ],
    byCrop: [
      { cropName: 'Soja', count: 3 },
      { cropName: 'Milho', count: 2 },
      { cropName: 'Algodão', count: 1 },
    ],
  };

  beforeEach(() => {
    dashboardRepositoryMock = {
      getSummary: vi.fn().mockResolvedValue(mockSummaryData),
    };

    useCase = new GetDashboardSummaryUseCase(dashboardRepositoryMock);
  });

  it('should return dashboard summary data', async () => {
    const result = await useCase.execute();

    expect(result).toEqual(mockSummaryData);

    expect(result.totalFarms).toBe(5);
    expect(result.totalHectares).toBe(2500);
    expect(result.landUse.agriculturalArea).toBe(1800);
    expect(result.landUse.vegetationArea).toBe(700);
    expect(result.byState).toHaveLength(2);
    expect(result.byCrop).toHaveLength(3);

    expect(dashboardRepositoryMock.getSummary).toHaveBeenCalledTimes(1);
  });
});