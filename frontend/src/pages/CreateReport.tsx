import { ChevronLeft } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReportForm } from '@/components/reports/ReportForm';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useInstitution } from '@/contexts/InstitutionContext';

export const CreateReport = () => {
  const navigate = useNavigate();
  const { selectedInstitution } = useInstitution();

  useEffect(() => {
    if (!selectedInstitution) {
      navigate('/');
    }
  }, [selectedInstitution, navigate]);

  return (
    <div className="container max-w-2xl mx-auto space-y-6">
      <Button
        variant="ghost"
        className="gap-2 pl-2 text-muted-foreground hover:text-foreground"
        onClick={() => navigate('/')}
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Institution Selection
      </Button>

      <Card className="border-none shadow-lg">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl">Create Report</CardTitle>
          <CardDescription className="text-lg">
            Send a report to{' '}
            <span className="font-medium text-primary">
              {selectedInstitution?.name}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReportForm />
        </CardContent>
      </Card>
    </div>
  );
};
