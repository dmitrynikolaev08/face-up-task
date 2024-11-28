import { ChevronLeft, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetApiReportsId } from '@/api/reports/reports';
import { ReportDetailContent } from '@/components/reports/ReportDetailContent';
import { Button } from '@/components/ui/button';

export const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: report, isLoading } = useGetApiReportsId(id!);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!report) {
    navigate('/reports');
    return null;
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        className="gap-2 pl-2 text-muted-foreground hover:text-foreground"
        onClick={() => navigate('/reports')}
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Reports
      </Button>
      <ReportDetailContent report={report} />
    </div>
  );
};
