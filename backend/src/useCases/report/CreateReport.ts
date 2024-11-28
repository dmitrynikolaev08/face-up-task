import { Report, ReportFile } from '../../domain/entities/Report';
import { ReportRepository } from '../../domain/interfaces/ReportRepository';

export class CreateReportUseCase {
  constructor(private reportRepository: ReportRepository) {}

  async execute(
    senderName: string,
    senderAge: number,
    message: string,
    institutionId: string,
    files: ReportFile[] = [],
  ): Promise<Report> {
    return this.reportRepository.create({
      senderName,
      senderAge,
      message,
      institutionId,
      files,
    });
  }
}
