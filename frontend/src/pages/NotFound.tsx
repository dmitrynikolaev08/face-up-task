import { AlertCircle, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="container max-w-md mx-auto min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full">
        <CardHeader className="text-center pb-8">
          <div className="w-full flex justify-center mb-4">
            <div className="rounded-full bg-destructive/10 p-3">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-3xl">Page Not Found</CardTitle>
          <CardDescription className="text-lg">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full gap-2"
            size="lg"
            onClick={() => navigate('/')}
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
