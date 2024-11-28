import { InstitutionSelect } from '@/components/institutions/InstitutionSelect';

export const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl mb-8">
        Send Report to Institution
      </h1>

      <InstitutionSelect />
    </div>
  );
};
