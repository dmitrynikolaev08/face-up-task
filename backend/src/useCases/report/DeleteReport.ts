import { ReportRepository } from '../../domain/interfaces/ReportRepository';

export class DeleteReportUseCase {
  constructor(private reportRepository: ReportRepository) {}

  async execute(id: string): Promise<void> {
    return this.reportRepository.delete(id);
  }
}
