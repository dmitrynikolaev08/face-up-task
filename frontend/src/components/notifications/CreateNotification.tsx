import { useQueryClient } from '@tanstack/react-query';
import { AlertCircle, Loader2, X } from 'lucide-react';
import { useState } from 'react';

import { PostApiNotificationsBody, User } from '@/api/model';
import { usePostApiNotifications } from '@/api/notifications/notifications';
import { useGetApiUsers } from '@/api/users/users';
import { useFileUpload } from '@/hooks/useFileUpload';

export const CreateNotification = () => {
  const [message, setMessage] = useState('');
  const { files, fileErrors, handleFileChange, removeFile, clearFiles } =
    useFileUpload();

  const queryClient = useQueryClient();
  const { data: users } = useGetApiUsers<User[], Error>();
  const { mutate: createNotification, isPending } = usePostApiNotifications<
    PostApiNotificationsBody,
    Error
  >();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!users?.[0]?.id || fileErrors.length > 0) return;

    const formData = new FormData();
    formData.append('message', message);
    formData.append('userId', users[0].id);

    files.forEach((file) => {
      formData.append('files', file);
    });

    createNotification(
      {
        data: {
          message,
          userId: users[0].id,
          files,
        },
      },
      {
        onSuccess: () => {
          setMessage('');
          clearFiles();
          queryClient.invalidateQueries({ queryKey: ['/api/notifications'] });
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-md border border-input px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Files</label>
        <div className="space-y-2">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full"
            accept="image/*,application/pdf,.doc,.docx"
          />

          {fileErrors.length > 0 && (
            <div className="text-sm text-destructive space-y-1">
              {fileErrors.map((error, index) => (
                <div key={index} className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              ))}
            </div>
          )}

          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-md border bg-muted p-2"
                >
                  <span className="text-sm truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending || fileErrors.length > 0}
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
      >
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        {isPending ? 'Creating...' : 'Create Notification'}
      </button>
    </form>
  );
};
