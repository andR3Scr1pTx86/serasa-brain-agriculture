import { Controller, Get } from "@nestjs/common";
import { GetDashboardSummaryUseCase } from "../../../application/use-cases/get-dashboard-summary.use-case.js";

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly getDashboardSummaryUseCase: GetDashboardSummaryUseCase,
  ) {}

  @Get()
  async getSummary() {
    return this.getDashboardSummaryUseCase.execute();
  }
}