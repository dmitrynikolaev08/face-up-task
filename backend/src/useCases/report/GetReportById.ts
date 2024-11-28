import { Report } from '../../domain/entities/Report';
import { ReportRepository } from '../../domain/interfaces/ReportRepository';

export class GetReportByIdUseCase {
  constructor(private reportRepository: ReportRepository) {}

  async execute(id: string): Promise<Report | null> {
    return this.reportRepository.findById(id);
  }
}
