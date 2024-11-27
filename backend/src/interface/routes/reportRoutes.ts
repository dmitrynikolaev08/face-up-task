import { Router } from 'express';
import { ReportController } from '../controllers/ReportController';
import { CreateReportUseCase } from '../../useCases/report/CreateReport';
import { PrismaReportRepository } from '../../infrastructure/repositories/PrismaReportRepository';
import { upload } from '../middleware/uploadMiddleware';
import { GetReportsUseCase } from '../../useCases/report/GetReports';
import { DeleteReportUseCase } from '../../useCases/report/DeleteReport';

/**
 * @swagger
 * components:
 *   schemas:
 *     ReportFile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         filename:
 *           type: string
 *         path:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *     Report:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         senderName:
 *           type: string
 *         senderAge:
 *           type: integer
 *         message:
 *           type: string
 *         institutionId:
 *           type: string
 *         files:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ReportFile'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
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
 *             properties:
 *               senderName:
 *                 type: string
 *               senderAge:
 *                 type: integer
 *               message:
 *                 type: string
 *               institutionId:
 *                 type: string
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *             required:
 *               - senderName
 *               - senderAge
 *               - message
 *               - institutionId
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
 *     responses:
 *       200:
 *         description: List of reports
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Report'
 *       500:
 *         description: Server error
 * 
 * /api/reports/{id}:
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
 *         description: Report ID
 *     responses:
 *       204:
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
const deleteReportUseCase = new DeleteReportUseCase(reportRepository);
const reportController = new ReportController(
  createReportUseCase,
  getReportsUseCase,
  deleteReportUseCase,
);

reportRouter.post('/', upload.array('files'), (req, res) =>
  reportController.execute(req, res),
);

reportRouter.get('/', (req, res) => reportController.execute(req, res));

reportRouter.delete('/:id', (req, res) => reportController.execute(req, res));

export { reportRouter };