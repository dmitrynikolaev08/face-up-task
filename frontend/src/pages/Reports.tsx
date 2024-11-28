import { ReportsTable } from '@/components/reports/ReportsTable';

export const Reports = () => {
  return (
    <div className="container max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Reports</h1>
      <ReportsTable />
    </div>
  );
};
