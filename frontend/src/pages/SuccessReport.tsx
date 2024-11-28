import { useLocation, useNavigate } from 'react-router-dom';

import { Report } from '@/api/model';
import { SuccessReportContent } from '@/components/reports/SuccessReportContent';

export const SuccessReport = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const report = location.state?.report as Report;

  if (!report) {
    navigate('/');
    return null;
  }

  return <SuccessReportContent report={report} />;
};
