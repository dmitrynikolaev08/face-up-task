/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Face Up Task API
 * API documentation for Face Up Task
 * OpenAPI spec version: 1.0.0
 */
import type { Report } from './report';

export type GetApiReports200 = {
  reports?: Report[];
  /** Total number of reports in the database */
  total?: number;
};