import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { AlertCircle, Loader2, Send, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

import { usePostApiNotifications } from '@/api/notifications/notifications';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useInstitution } from '@/contexts/InstitutionContext';
import { useFileUpload } from '@/hooks/useFileUpload';

const formSchema = z.object({
  senderName: z.string().min(2, 'Name must be at least 2 characters'),
  senderAge: z.coerce
    .number()
    .min(1, 'Age must be at least 1')
    .max(150, 'Age must be less than 150'),
  message: z.string().min(1, 'Message is required'),
});

export const CreateNotification = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { selectedInstitution } = useInstitution();
  const { files, fileErrors, handleFileChange, removeFile, clearFiles } =
    useFileUpload();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      senderName: '',
      senderAge: undefined,
      message: '',
    },
  });

  const { mutate: createNotification, isPending } = usePostApiNotifications();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!selectedInstitution || fileErrors.length > 0) return;

    const formData = new FormData();
    formData.append('senderName', values.senderName);
    formData.append('senderAge', values.senderAge.toString());
    formData.append('message', values.message);
    formData.append('institutionId', selectedInstitution.id);

    files.forEach((file) => {
      formData.append('files', file);
    });

    createNotification(
      {
        data: {
          message: values.message,
          userId: '1', // TODO: get user id
          files,
        },
      },
      {
        onSuccess: () => {
          form.reset();
          clearFiles();
          queryClient.invalidateQueries({ queryKey: ['/api/notifications'] });
          navigate('/');
        },
      },
    );
  };

  if (!selectedInstitution) {
    navigate('/');
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Notification</CardTitle>
        <CardDescription>
          Send a notification to {selectedInstitution.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="senderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="senderAge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Age</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="25" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your message..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Attachments</FormLabel>
              <Input
                type="file"
                multiple
                onChange={handleFileChange}
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
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={isPending || fileErrors.length > 0}
              className="w-full"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send />
                  Send Notification
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
