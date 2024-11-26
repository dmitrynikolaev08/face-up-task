export interface NotificationFile {
  id: string;
  filename: string;
  path: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  files: NotificationFile[];
  createdAt: Date;
  updatedAt: Date;
}
