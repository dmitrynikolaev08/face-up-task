import prisma from '../database/prismaClient';
import { Report } from '../../domain/entities/Report';
import { ReportRepository } from '../../domain/interfaces/ReportRepository';
import { NotificationFile } from '../../domain/entities/Notification';

export class PrismaReportRepository implements ReportRepository {
  async create(
    report: Omit<Report, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Report> {
    return prisma.report
      .create({
        data: {
          senderName: report.senderName,
          senderAge: report.senderAge,
          message: report.message,
          institutionId: report.institutionId,
          files: JSON.stringify(report.files),
        },
      })
      .then(this.mapReport);
  }

  async findAll(): Promise<Report[]> {
    const reports = await prisma.report.findMany();
    return reports.map(this.mapReport);
  }

  async findById(id: string): Promise<Report | null> {
    const report = await prisma.report.findUnique({
      where: { id },
    });
    return report ? this.mapReport(report) : null;
  }

  async update(id: string, report: Partial<Report>): Promise<Report> {
    const data: any = { ...report };
    if (report.files) {
      data.files = JSON.stringify(report.files);
    }

    const updated = await prisma.report.update({
      where: { id },
      data,
    });
    return this.mapReport(updated);
  }

  async delete(id: string): Promise<void> {
    await prisma.report.delete({
      where: { id },
    });
  }

  private mapReport(report: any): Report {
    return {
      ...report,
      files: JSON.parse(report.files) as NotificationFile[],
    };
  }
}
