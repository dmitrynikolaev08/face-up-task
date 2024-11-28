import { Report } from '../../domain/entities/Report';
import { ReportRepository } from '../../domain/interfaces/ReportRepository';

export class GetReportsUseCase {
  constructor(private reportRepository: ReportRepository) {}

  async execute(page: number = 1, limit: number = 10): Promise<{
    reports: Report[];
    total: number;
  }> {
    return this.reportRepository.findAll(page, limit);
  }
}
