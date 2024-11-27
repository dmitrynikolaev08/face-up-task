import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { CreateReportUseCase } from '../../useCases/report/CreateReport';
import { NotificationFile } from '../../domain/entities/Notification';
import { GetReportsUseCase } from '../../useCases/report/GetReports';
import { DeleteReportUseCase } from '../../useCases/report/DeleteReport';

export class ReportController extends BaseController {
  constructor(
    private createReportUseCase: CreateReportUseCase,
    private getReportsUseCase: GetReportsUseCase,
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
              (file): NotificationFile => ({
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
          const reports = await this.getReportsUseCase.execute();
          this.ok(res, reports);
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