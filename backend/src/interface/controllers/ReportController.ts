import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { CreateReportUseCase } from '../../useCases/report/CreateReport';
import { GetReportsUseCase } from '../../useCases/report/GetReports';
import { DeleteReportUseCase } from '../../useCases/report/DeleteReport';
import { GetReportByIdUseCase } from '../../useCases/report/GetReportById';
import { ReportFile } from '../../domain/entities/Report';

export class ReportController extends BaseController {
  constructor(
    private createReportUseCase: CreateReportUseCase,
    private getReportsUseCase: GetReportsUseCase,
    private getReportByIdUseCase: GetReportByIdUseCase,
    private deleteReportUseCase: DeleteReportUseCase,
  ) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    try {
      switch (req.method) {
        case 'POST':
          const { senderName, senderAge, message, institutionId } = req.body;

          if (!senderName || !senderAge || !message || !institutionId) {
            this.clientError(res, 'All fields are required');
            return;
          }

          const files =
            (req.files as Express.Multer.File[])?.map(
              (file): ReportFile => ({
                id: file.filename.split('.')[0],
                filename: file.originalname,
                path: `/uploads/${file.filename}`,
                createdAt: new Date(),
              }),
            ) || [];

          const report = await this.createReportUseCase.execute(
            senderName,
            Number(senderAge),
            message,
            institutionId,
            files,
          );

          this.created(res, report);
          break;

        case 'GET':
          if (req.params.id) {
            const report = await this.getReportByIdUseCase.execute(
              req.params.id,
            );
            if (!report) {
              this.notFound(res, 'Report not found');
              return;
            }
            this.ok(res, report);
          } else {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const result = await this.getReportsUseCase.execute(page, limit);
            this.ok(res, result);
          }
          break;

        case 'DELETE':
          const { id } = req.params;
          await this.deleteReportUseCase.execute(id);
          this.ok(res);
          break;

        default:
          this.clientError(res, 'Method not supported');
      }
    } catch (err) {
      throw err;
    }
  }
}
