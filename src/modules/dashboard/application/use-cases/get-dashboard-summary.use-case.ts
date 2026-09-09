import { Inject, Injectable } from "@nestjs/common";
import { DASHBOARD_REPOSITORY_TOKEN, type IDashboardRepository } from "../../domain/repositories/dashboard.repository.interface.js";
import { DashboardSummaryOutputDto } from "../dtos/dashboard-summary.dto.js";

@Injectable()
export class GetDashboardSummaryUseCase {
  constructor(
    @Inject(DASHBOARD_REPOSITORY_TOKEN)
    private readonly dashboardRepository: IDashboardRepository,
  ) {}

  async execute(): Promise<DashboardSummaryOutputDto> {
    return this.dashboardRepository.getSummary();
  }
}