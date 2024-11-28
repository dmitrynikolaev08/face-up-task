import { Report } from '../entities/Report';

export interface ReportRepository {
  create(
    report: Omit<Report, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Report>;
  findAll(
    page?: number,
    limit?: number,
    filters?: FilterOptions,
    sort?: SortOptions,
  ): Promise<{
    reports: Report[];
    total: number;
  }>;
  findById(id: string): Promise<Report | null>;
  update(id: string, report: Partial<Report>): Promise<Report>;
  delete(id: string): Promise<void>;
}

export interface FilterOptions {
  senderName?: string;
  senderAge?: number;
  message?: string;
  createdAt?: string;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}
