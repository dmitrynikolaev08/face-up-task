import { createContext, ReactNode, useContext, useState } from 'react';

import { Institution } from '@/api/model';

interface InstitutionContextType {
  selectedInstitution: Institution | null;
  setSelectedInstitution: (institution: Institution | null) => void;
}

const InstitutionContext = createContext<InstitutionContextType | undefined>(
  undefined,
);

export function InstitutionProvider({ children }: { children: ReactNode }) {
  const [selectedInstitution, setSelectedInstitution] =
    useState<Institution | null>(null);

  return (
    <InstitutionContext.Provider
      value={{ selectedInstitution, setSelectedInstitution }}
    >
      {children}
    </InstitutionContext.Provider>
  );
}

export function useInstitution() {
  const context = useContext(InstitutionContext);
  if (context === undefined) {
    throw new Error(
      'useInstitution must be used within an InstitutionProvider',
    );
  }
  return context;
}
