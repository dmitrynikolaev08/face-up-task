import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { AlertCircle, Info, Loader2, Send, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

import { usePostApiReports } from '@/api/reports/reports';
import { Button } from '@/components/ui/button';
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

import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  senderName: z.string().min(2, 'Name must be at least 2 characters'),
  senderAge: z.coerce
    .number()
    .min(1, 'Age must be at least 1')
    .max(150, 'Age must be less than 150'),
  message: z.string().min(1, 'Message is required'),
});

type FormData = z.infer<typeof formSchema>;

const MAX_FILES = 5;

export const ReportForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { selectedInstitution } = useInstitution();
  const { files, fileErrors, handleFileChange, removeFile, clearFiles } =
    useFileUpload();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      senderName: '',
      senderAge: undefined,
      message: '',
    },
  });

  const { mutate: createReport, isPending } = usePostApiReports();

  const onSubmit = (values: FormData) => {
    if (!selectedInstitution || fileErrors.length > 0) return;

    createReport(
      {
        data: {
          senderName: values.senderName,
          senderAge: values.senderAge,
          message: values.message,
          institutionId: selectedInstitution.id!,
          files,
        },
      },
      {
        onSuccess: (response) => {
          form.reset();
          clearFiles();
          queryClient.invalidateQueries({ queryKey: ['/api/reports'] });
          navigate('/success', { state: { report: response } });
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
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
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your issue in detail..."
                  {...field}
                  maxLength={1000}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Attachments</FormLabel>
          </div>

          <div className="flex items-center gap-4">
            <Input
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*,application/pdf,.doc,.docx"
              className="cursor-pointer"
              disabled={files.length >= MAX_FILES}
            />
            {files.length > 0 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={clearFiles}
              >
                Clear All
              </Button>
            )}
          </div>

          {files.length >= MAX_FILES && (
            <div className="rounded-md bg-yellow-500/10 p-3 text-sm text-yellow-700 space-y-1">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>Maximum number of files reached ({MAX_FILES})</span>
              </div>
            </div>
          )}

          {files.length === 0 && (
            <div className="rounded-md bg-muted/50 p-3 text-sm text-muted-foreground space-y-1">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 shrink-0" />
                <span>No files added</span>
              </div>
            </div>
          )}

          {fileErrors.length > 0 && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive space-y-1">
              {fileErrors.map((error, index) => (
                <div key={index} className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              ))}
            </div>
          )}

          {files.length > 0 && (
            <div className="rounded-md border bg-muted/50 p-3 space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-md bg-background p-2 text-sm"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Send className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{file.name}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="shrink-0"
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
          className="w-full gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Sending Report...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Send Report
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
