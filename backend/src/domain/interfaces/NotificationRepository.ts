import { Notification } from '../entities/Notification';

export interface NotificationRepository {
  create(
    notification: Omit<Notification, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Notification>;
  findAll(): Promise<Notification[]>;
  findAllByUserId(userId: string): Promise<Notification[]>;
  findById(id: string): Promise<Notification | null>;
  update(
    id: string,
    notification: Partial<Notification>,
  ): Promise<Notification>;
  delete(id: string): Promise<void>;
}
