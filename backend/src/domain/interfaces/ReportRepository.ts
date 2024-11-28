import { Report } from '../entities/Report';

export interface ReportRepository {
  create(
    report: Omit<Report, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Report>;
  findAll(): Promise<Report[]>;
  findById(id: string): Promise<Report | null>;
  delete(id: string): Promise<void>;
}
