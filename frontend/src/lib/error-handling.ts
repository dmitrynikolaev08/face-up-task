import { AxiosError } from 'axios';

import { toast } from '@/hooks/use-toast';
import { isValidationError } from '@/types/api';

export const handleApiError = (error: unknown) => {
  if (error instanceof AxiosError && error.code === 'ERR_CANCELED') {
    return;
  }
  if (error instanceof AxiosError) {
    if (isValidationError(error.response?.data)) {
      const firstError = Object.values(error.response.data.errors)[0]?.[0];
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: firstError || 'Please check your input',
      });
      return;
    }

    const message = error.response?.data?.message || error.message;
    toast({
      variant: 'destructive',
      title: error.response?.status === 500 ? 'Server Error' : 'Error',
      description: message,
    });
    return;
  }

  toast({
    variant: 'destructive',
    title: 'Error',
    description: 'An unexpected error occurred. Please try again.',
  });
};
