import { Router } from 'express';
import { NotificationController } from '../controllers/NotificationController';
import { CreateNotificationUseCase } from '../../useCases/notification/CreateNotification';
import { GetNotificationsUseCase } from '../../useCases/notification/GetNotifications';
import { PrismaNotificationRepository } from '../../infrastructure/repositories/PrismaNotificationRepository';
import { upload } from '../middleware/uploadMiddleware';
import { DeleteNotificationUseCase } from '../../useCases/notification/DeleteNotification';

/**
 * @swagger
 * components:
 *   schemas:
 *     NotificationFile:
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
 *     Notification:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         userId:
 *           type: string
 *         message:
 *           type: string
 *         files:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/NotificationFile'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Create a new notification
 *     tags:
 *       - Notifications
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               message:
 *                 type: string
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Notification created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *   get:
 *     summary: Get all notifications
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter notifications by user ID
 *     responses:
 *       200:
 *         description: List of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *   delete:
 *     summary: Delete a notification
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Server error
 */

const notificationRouter = Router();
const notificationRepository = new PrismaNotificationRepository();

const createNotificationUseCase = new CreateNotificationUseCase(
  notificationRepository,
);
const getNotificationsUseCase = new GetNotificationsUseCase(
  notificationRepository,
);
const deleteNotificationUseCase = new DeleteNotificationUseCase(
  notificationRepository,
);

const notificationController = new NotificationController(
  createNotificationUseCase,
  getNotificationsUseCase,
  deleteNotificationUseCase,
);

notificationRouter.post('/', upload.array('files'), (req, res) =>
  notificationController.execute(req, res),
);
notificationRouter.get('/', (req, res) =>
  notificationController.execute(req, res),
);
notificationRouter.delete('/:id', (req, res) =>
  notificationController.execute(req, res),
);

export { notificationRouter };
