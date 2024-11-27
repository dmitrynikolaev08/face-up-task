import { Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useInstitution } from '@/contexts/InstitutionContext';

const institutions = [
  { id: '1', name: 'Test School' },
  { id: '2', name: 'Elementary School' },
  { id: '3', name: 'High School' },
] as const;

export const Landing = () => {
  const navigate = useNavigate();
  const { selectedInstitution, setSelectedInstitution } = useInstitution();

  const handleInstitutionChange = (institutionId: string) => {
    const institution = institutions.find((i) => i.id === institutionId);
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
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
        Send Notification to School
      </h1>

      <div className="w-full max-w-md space-y-8">
        <Select
          onValueChange={handleInstitutionChange}
          value={selectedInstitution?.id}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Institution" />
          </SelectTrigger>
          <SelectContent>
            {institutions.map((institution) => (
              <SelectItem key={institution.id} value={institution.id}>
                {institution.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          className="w-full"
          size="lg"
          onClick={handleContinue}
          disabled={!selectedInstitution}
        >
          <Send className="mr-2 h-4 w-4" />
          Continue
        </Button>
      </div>
    </div>
  );
};
