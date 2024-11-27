import { Report } from '../../domain/entities/Report';
import { ReportRepository } from '../../domain/interfaces/ReportRepository';
import { NotificationFile } from '../../domain/entities/Notification';

export class CreateReportUseCase {
  constructor(private reportRepository: ReportRepository) {}

  async execute(
    senderName: string,
    senderAge: number,
    message: string,
    institutionId: string,
    files: NotificationFile[] = [],
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
