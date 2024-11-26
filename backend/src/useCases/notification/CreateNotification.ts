import {
  Notification,
  NotificationFile,
} from '../../domain/entities/Notification';
import { NotificationRepository } from '../../domain/interfaces/NotificationRepository';

export class CreateNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    userId: string,
    message: string,
    files: NotificationFile[] = [],
  ): Promise<Notification> {
    return this.notificationRepository.create({
      userId,
      message,
      files,
    });
  }
}
