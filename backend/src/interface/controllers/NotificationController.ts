import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { CreateNotificationUseCase } from '../../useCases/notification/CreateNotification';
import { GetNotificationsUseCase } from '../../useCases/notification/GetNotifications';
import { NotificationFile } from '../../domain/entities/Notification';
import { DeleteNotificationUseCase } from '../../useCases/notification/DeleteNotification';

export class NotificationController extends BaseController {
  constructor(
    private createNotificationUseCase: CreateNotificationUseCase,
    private getNotificationsUseCase: GetNotificationsUseCase,
    private deleteNotificationUseCase: DeleteNotificationUseCase,
  ) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    try {
      switch (req.method) {
        case 'POST':
          const { userId, message } = req.body;
          if (!userId || !message) {
            this.clientError(res, 'UserId and message are required');
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

          const notification = await this.createNotificationUseCase.execute(
            userId,
            message,
            files,
          );
          this.created(res, notification);
          break;

        case 'GET':
          const notifications = await this.getNotificationsUseCase.execute(
            req.query.userId as string,
          );
          this.ok(res, notifications);
          break;

        case 'DELETE':
          const { id } = req.params;
          await this.deleteNotificationUseCase.execute(id);
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
