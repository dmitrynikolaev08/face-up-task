import { Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useGetApiInstitutions } from '@/api/institutions/institutions';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useInstitution } from '@/contexts/InstitutionContext';

export const InstitutionSelect = () => {
  const navigate = useNavigate();
  const { selectedInstitution, setSelectedInstitution } = useInstitution();
  const { data: institutions, isLoading } = useGetApiInstitutions();

  const handleInstitutionChange = (institutionId: string) => {
    const institution = institutions?.find((i) => i.id === institutionId);
    if (institution) {
      setSelectedInstitution(institution);
    }
  };

  const handleContinue = () => {
    if (selectedInstitution) {
      navigate('/create');
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <Select
        onValueChange={handleInstitutionChange}
        value={selectedInstitution?.id}
        disabled={isLoading}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Institution" />
        </SelectTrigger>
        <SelectContent>
          {institutions?.map((institution) => (
            <SelectItem key={institution.id} value={institution.id!}>
              {institution.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        className="w-auto"
        size="lg"
        onClick={handleContinue}
        disabled={!selectedInstitution || isLoading}
      >
        <Send className="mr-1 h-4 w-4" />
        Continue
      </Button>
    </div>
  );
};
