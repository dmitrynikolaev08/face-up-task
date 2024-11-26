import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { CreateNotificationUseCase } from '../../useCases/notification/CreateNotification';
import { GetNotificationsUseCase } from '../../useCases/notification/GetNotifications';

export class NotificationController extends BaseController {
  constructor(
    private createNotificationUseCase: CreateNotificationUseCase,
    private getNotificationsUseCase: GetNotificationsUseCase,
  ) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    try {
      switch (req.method) {
        case 'POST':
          const { userId, message, files } = req.body;
          if (!userId || !message) {
            this.clientError(res, 'UserId and message are required');
            return;
          }
          const notification = await this.createNotificationUseCase.execute(
            userId,
            message,
            files || [],
          );
          this.created(res, notification);
          break;

        case 'GET':
          const notifications = await this.getNotificationsUseCase.execute(
            req.query.userId as string,
          );
          this.ok(res, notifications);
          break;

        default:
          this.clientError(res, 'Method not supported');
      }
    } catch (err) {
      throw err;
    }
  }
}
