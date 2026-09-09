import { DashboardSummaryOutputDto } from '../../application/dtos/dashboard-summary.dto.js';

export interface IDashboardRepository {
  getSummary(): Promise<DashboardSummaryOutputDto>;
}

export const DASHBOARD_REPOSITORY_TOKEN = Symbol('IDashboardRepository');
