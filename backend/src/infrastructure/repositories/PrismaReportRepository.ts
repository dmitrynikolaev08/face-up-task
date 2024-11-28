import prisma from '../database/prismaClient';
import { Report, ReportFile } from '../../domain/entities/Report';
import {
  FilterOptions,
  ReportRepository,
  SortOptions,
} from '../../domain/interfaces/ReportRepository';

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

  async findAll(
    page: number = 1,
    limit: number = 10,
    filters?: FilterOptions,
    sort?: SortOptions,
  ): Promise<{
    reports: Report[];
    total: number;
  }> {
    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.senderName) {
      where.senderName = { contains: filters.senderName };
    }
    if (filters?.senderAge) {
      where.senderAge = Number(filters.senderAge);
    }
    if (filters?.message) {
      where.message = { contains: filters.message };
    }
    if (filters?.createdAt) {
      const date = new Date(filters.createdAt);
      where.createdAt = {
        gte: date,
        lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
      };
    }

    const orderBy: any = sort
      ? { [sort.field]: sort.direction }
      : { createdAt: 'desc' };

    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          institution: {
            select: {
              name: true,
            },
          },
        },
      }),
      prisma.report.count({ where }),
    ]);

    return {
      reports: reports.map(this.mapReport),
      total,
    };
  }

  async findById(id: string): Promise<Report | null> {
    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        institution: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!report) return null;

    return {
      ...report,
      files: JSON.parse(report.files) as ReportFile[],
      institution: report.institution,
    };
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
      files: JSON.parse(report.files) as ReportFile[],
    };
  }
}
