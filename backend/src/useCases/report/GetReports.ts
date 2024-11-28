import { Report } from '../../domain/entities/Report';
import {
  FilterOptions,
  ReportRepository,
  SortOptions,
} from '../../domain/interfaces/ReportRepository';

export class GetReportsUseCase {
  constructor(private reportRepository: ReportRepository) {}

  async execute(
    page: number = 1,
    limit: number = 10,
    filters?: FilterOptions,
    sort?: SortOptions,
  ): Promise<{
    reports: Report[];
    total: number;
  }> {
    return this.reportRepository.findAll(page, limit, filters, sort);
  }
}
