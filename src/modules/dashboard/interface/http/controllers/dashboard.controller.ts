import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { GetDashboardSummaryUseCase } from '../../../application/use-cases/get-dashboard-summary.use-case.js';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DashboardSummaryResponseDto } from '../dtos/dashboard.response.dto.js';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly getDashboardSummaryUseCase: GetDashboardSummaryUseCase,
  ) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obter métricas'
  })
  @ApiResponse({
    status: 200,
    description: 'Métricas do dashboard retornada com sucesso',
    type: DashboardSummaryResponseDto,
  })
  async getSummary(): Promise<DashboardSummaryResponseDto> {
    return this.getDashboardSummaryUseCase.execute();
  }
}
