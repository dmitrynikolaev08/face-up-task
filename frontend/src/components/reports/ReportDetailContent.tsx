import { FileText, User } from 'lucide-react';

import { Report, ReportFile } from '@/api/model';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ReportDetailContentProps {
  report: Report;
}

export const ReportDetailContent = ({ report }: ReportDetailContentProps) => {
  const serverUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const renderAttachment = (file: ReportFile) => (
    <div
      key={file.id}
      className={cn(
        'flex items-center gap-2 p-2 rounded-md',
        'text-sm text-muted-foreground',
        'hover:bg-muted/50 transition-colors',
      )}
    >
      <FileText className="h-4 w-4 shrink-0" />
      <a
        href={`${serverUrl}${file.path}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline truncate"
      >
        {file.filename}
      </a>
    </div>
  );

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {report.senderName}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Submitted on {new Date(report.createdAt!).toLocaleDateString()}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Age</p>
            <p className="text-lg">{report.senderAge} years old</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Institution
            </p>
            <p className="text-lg">{report.institution?.name}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Message</p>
          <div className="p-4 rounded-md bg-muted/50">
            <p className="whitespace-pre-wrap">{report.message}</p>
          </div>
        </div>

        {report.files && report.files.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Attachments ({report.files.length})
            </p>
            <div className="border rounded-md divide-y">
              {report.files.map(renderAttachment)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
