/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Face Up Task API
 * API documentation for Face Up Task
 * OpenAPI spec version: 1.0.0
 */

export interface ReportFile {
  /** The timestamp when the file was uploaded */
  createdAt?: string;
  /** Original name of the uploaded file */
  filename: string;
  /** The unique identifier of the file */
  id: string;
  /** Path where the file is stored */
  path: string;
}
