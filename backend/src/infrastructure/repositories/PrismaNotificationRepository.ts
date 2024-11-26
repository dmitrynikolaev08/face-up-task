import {
  Notification,
  NotificationFile,
} from '../../domain/entities/Notification';
import { NotificationRepository } from '../../domain/interfaces/NotificationRepository';
import prisma from '../database/prismaClient';

export class PrismaNotificationRepository implements NotificationRepository {
  async create(
    notification: Omit<Notification, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Notification> {
    return prisma.notification
      .create({
        data: {
          userId: notification.userId,
          message: notification.message,
          files: JSON.stringify(notification.files),
        },
      })
      .then(this.mapNotification);
  }

  async findAll(): Promise<Notification[]> {
    const notifications = await prisma.notification.findMany();
    return notifications.map(this.mapNotification);
  }

  async findAllByUserId(userId: string): Promise<Notification[]> {
    const notifications = await prisma.notification.findMany({
      where: { userId },
    });
    return notifications.map(this.mapNotification);
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = await prisma.notification.findUnique({
      where: { id },
    });
    return notification ? this.mapNotification(notification) : null;
  }

  async update(
    id: string,
    notification: Partial<Notification>,
  ): Promise<Notification> {
    const data: any = { ...notification };
    if (notification.files) {
      data.files = JSON.stringify(notification.files);
    }

    const updated = await prisma.notification.update({
      where: { id },
      data,
    });
    return this.mapNotification(updated);
  }

  async delete(id: string): Promise<void> {
    await prisma.notification.delete({
      where: { id },
    });
  }

  private mapNotification(notification: any): Notification {
    return {
      ...notification,
      files: JSON.parse(notification.files) as NotificationFile[],
    };
  }
}
