import { NotificationRepository } from '../../domain/interfaces/NotificationRepository';

export class DeleteNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(id: string): Promise<void> {
    await this.notificationRepository.delete(id);
  }
}
