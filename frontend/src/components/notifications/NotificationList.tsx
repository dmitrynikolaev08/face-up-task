import { useGetApiNotifications } from '../../api/notifications/notifications';
import { Notification } from '../../api/model';
import { AlertCircle, FileText, Loader2, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

export const NotificationList = () => {
  const serverUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const {
    data: notifications,
    isLoading,
    error,
  } = useGetApiNotifications<Notification[], Error>();

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-destructive">
        <AlertCircle className="h-4 w-4" />
        <span>Error loading notifications: {error.message}</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Notifications</h2>
      <div className="grid gap-4">
        {notifications?.map((notification) => (
          <div
            key={notification.id}
            className="rounded-lg border bg-card p-4 flex justify-between items-center"
          >
            <div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Message:</p>
                <p>{notification.message}</p>
              </div>
              {notification.files && notification.files.length > 0 && (
                <div className="mt-2 space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Attachments:
                  </p>
                  <div className="grid gap-2">
                    {notification.files.map((file) => (
                      <a
                        key={file.id}
                        href={`${serverUrl}${file.path}`}
                        download={file.filename}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <FileText className="h-4 w-4" />
                        {file.filename}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              <p className="mt-2 text-sm text-muted-foreground">
                Created: {new Date(notification.createdAt!).toLocaleString()}
              </p>
            </div>
            <Button variant="outline" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
