/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Face Up Task API
 * API documentation for Face Up Task
 * OpenAPI spec version: 1.0.0
 */
import type { ReportFile } from './reportFile';

export interface Report {
  createdAt?: string;
  files?: ReportFile[];
  id?: string;
  institutionId?: string;
  message?: string;
  senderAge?: number;
  senderName?: string;
  updatedAt?: string;
}
