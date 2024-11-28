import { CheckCircle2, FileText, Home, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Report } from '@/api/model';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface SuccessReportContentProps {
  report: Report;
}

export const SuccessReportContent = ({ report }: SuccessReportContentProps) => {
  const navigate = useNavigate();

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="rounded-full bg-green-100 p-3 mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Report Sent Successfully!</h1>
        <p className="text-muted-foreground">
          Your report has been successfully submitted and will be reviewed
          shortly.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Sender Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Name
                </p>
                <p className="text-lg">{report.senderName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Age</p>
                <p className="text-lg">{report.senderAge}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Report Content
            </CardTitle>
            <CardDescription>
              Submitted on {new Date(report.createdAt!).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Message
              </p>
              <p className="text-lg leading-relaxed">{report.message}</p>
            </div>

            {report.files && report.files.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Attached Files
                </p>
                <div className="grid gap-2">
                  {report.files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-2 p-2 rounded-md bg-muted"
                    >
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{file.filename}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Button onClick={() => navigate('/')} size="lg">
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    </div>
  );
};
