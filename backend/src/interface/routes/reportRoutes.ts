import { Router } from 'express';
import { ReportController } from '../controllers/ReportController';
import { CreateReportUseCase } from '../../useCases/report/CreateReport';
import { PrismaReportRepository } from '../../infrastructure/repositories/PrismaReportRepository';
import { upload } from '../middleware/uploadMiddleware';
import { GetReportsUseCase } from '../../useCases/report/GetReports';
import { DeleteReportUseCase } from '../../useCases/report/DeleteReport';
import { GetReportByIdUseCase } from '../../useCases/report/GetReportById';

/**
 * @swagger
 * components:
 *   schemas:
 *     ReportFile:
 *       type: object
 *       required:
 *         - id
 *         - filename
 *         - path
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of the file
 *         filename:
 *           type: string
 *           description: Original name of the uploaded file
 *         path:
 *           type: string
 *           description: Path where the file is stored
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the file was uploaded
 *     Report:
 *       type: object
 *       required:
 *         - senderName
 *         - senderAge
 *         - message
 *         - institutionId
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of the report
 *         senderName:
 *           type: string
 *           description: Name of the person sending the report
 *         senderAge:
 *           type: integer
 *           description: Age of the sender
 *           minimum: 1
 *           maximum: 150
 *         message:
 *           type: string
 *           description: Content of the report
 *         institutionId:
 *           type: string
 *           description: ID of the institution this report is for
 *         institution:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Name of the institution
 *         files:
 *           type: array
 *           description: Attached files
 *           items:
 *             $ref: '#/components/schemas/ReportFile'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the report was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the report was last updated
 */

/**
 * @swagger
 * /api/reports:
 *   post:
 *     summary: Create a new report
 *     tags:
 *       - Reports
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - senderName
 *               - senderAge
 *               - message
 *               - institutionId
 *             properties:
 *               senderName:
 *                 type: string
 *                 description: Name of the sender
 *               senderAge:
 *                 type: integer
 *                 description: Age of the sender
 *                 minimum: 1
 *                 maximum: 150
 *               message:
 *                 type: string
 *                 description: Content of the report
 *               institutionId:
 *                 type: string
 *                 description: ID of the institution
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Files to attach to the report
 *     responses:
 *       201:
 *         description: Report created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 *   get:
 *     summary: Get all reports
 *     tags:
 *       - Reports
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: The number of items per page
 *       - in: query
 *         name: senderName
 *         schema:
 *           type: string
 *         description: Filter by sender name
 *       - in: query
 *         name: senderAge
 *         schema:
 *           type: number
 *         description: Filter by sender age  
 *       - in: query
 *         name: message
 *         schema:
 *           type: string
 *         description: Filter by message
 *       - in: query
 *         name: createdAt
 *         schema:
 *           type: string
 *         description: Filter by created at
 *       - in: query
 *         name: sortField
 *         schema:
 *           type: string
 *         description: Sort by field
 *       - in: query
 *         name: sortDirection
 *         schema:
 *           type: string
 *         description: Sort direction
 *     responses:
 *       200:
 *         description: Paginated list of reports
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reports:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Report'
 *                 total:
 *                   type: integer
 *                   description: Total number of reports in the database
 *               example:
 *                 reports: [
 *                   {
 *                     id: "123",
 *                     senderName: "John Doe",
 *                     senderAge: 25,
 *                     message: "Test report",
 *                     institutionId: "456",
 *                     institution: { name: "City Hospital" },
 *                     files: [],
 *                     createdAt: "2024-01-01T12:00:00Z",
 *                     updatedAt: "2024-01-01T12:00:00Z"
 *                   }
 *                 ]
 *                 total: 50
 *       500:
 *         description: Server error
 * 
 * /api/reports/{id}:
 *   get:
 *     summary: Get report by ID
 *     tags:
 *       - Reports
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The report ID
 *     responses:
 *       200:
 *         description: Report found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       404:
 *         description: Report not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a report
 *     tags:
 *       - Reports
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Report ID to delete
 *     responses:
 *       200:
 *         description: Report deleted successfully
 *       404:
 *         description: Report not found
 *       500:
 *         description: Server error
 */

const reportRouter = Router();
const reportRepository = new PrismaReportRepository();
const createReportUseCase = new CreateReportUseCase(reportRepository);
const getReportsUseCase = new GetReportsUseCase(reportRepository);
const getReportByIdUseCase = new GetReportByIdUseCase(reportRepository);
const deleteReportUseCase = new DeleteReportUseCase(reportRepository);
const reportController = new ReportController(
  createReportUseCase,
  getReportsUseCase,
  getReportByIdUseCase,
  deleteReportUseCase,
);

reportRouter.post('/', upload.array('files'), (req, res) =>
  reportController.execute(req, res),
);

reportRouter.get('/', (req, res) => reportController.execute(req, res));

reportRouter.get('/:id', (req, res) => reportController.execute(req, res));

reportRouter.delete('/:id', (req, res) => reportController.execute(req, res));

export { reportRouter };
