/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Face Up Task API
 * API documentation for Face Up Task
 * OpenAPI spec version: 1.0.0
 */

export type GetApiReportsParams = {
/**
 * The page number for pagination
 */
page?: number;
/**
 * The number of items per page
 */
limit?: number;
/**
 * Filter by sender name
 */
senderName?: string;
/**
 * Filter by sender age
 */
senderAge?: number;
/**
 * Filter by message
 */
message?: string;
/**
 * Filter by created at
 */
createdAt?: string;
/**
 * Sort by field
 */
sortField?: string;
/**
 * Sort direction
 */
sortDirection?: string;
};
