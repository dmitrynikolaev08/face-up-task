import { Send } from 'lucide-react';

import { InstitutionSelect } from '@/components/institutions/InstitutionSelect';

export const Landing = () => {
  return (
    <div className="container max-w-2xl mx-auto">
      <div className="flex flex-col items-center justify-center min-h-[80vh] py-16 space-y-10">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Send a Report
          </h1>
          <p className="text-xl text-muted-foreground">
            Select an institution to send your report to
          </p>
        </div>

        <InstitutionSelect />
        {/* Features Grid */}
        <div className="flex items-center space-x-4 max-w-xs mx-auto">
          <div className="p-2 rounded-full bg-primary/10">
            <Send className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Quick Submission</h3>
            <p className="text-sm text-muted-foreground">
              Submit your report in minutes with our streamlined process
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
