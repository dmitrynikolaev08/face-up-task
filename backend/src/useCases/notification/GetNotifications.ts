import { Notification } from '../../domain/entities/Notification';
import { NotificationRepository } from '../../domain/interfaces/NotificationRepository';

export class GetNotificationsUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(userId?: string): Promise<Notification[]> {
    if (userId) {
      return this.notificationRepository.findAllByUserId(userId);
    }
    return this.notificationRepository.findAll();
  }
}
