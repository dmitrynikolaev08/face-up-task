import { Report } from '../../domain/entities/Report';
import { ReportRepository } from '../../domain/interfaces/ReportRepository';

export class GetReportsUseCase {
  constructor(private reportRepository: ReportRepository) {}

  async execute(): Promise<Report[]> {
    return this.reportRepository.findAll();
  }
}
