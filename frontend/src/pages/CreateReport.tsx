import { useNavigate } from 'react-router-dom';

import { ReportForm } from '@/components/reports/ReportForm';
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

  if (!selectedInstitution) {
    navigate('/');
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Report</CardTitle>
        <CardDescription>
          Send a report to {selectedInstitution.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReportForm />
      </CardContent>
    </Card>
  );
};
