import { Report } from '../entities/Report';

export interface ReportRepository {
  create(
    report: Omit<Report, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Report>;
  findAll(page?: number, limit?: number): Promise<{
    reports: Report[];
    total: number;
  }>;
  findById(id: string): Promise<Report | null>;
  update(id: string, report: Partial<Report>): Promise<Report>;
  delete(id: string): Promise<void>;
}
