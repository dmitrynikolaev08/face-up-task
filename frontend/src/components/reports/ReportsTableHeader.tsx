import { Filter, X } from 'lucide-react';

import { Button } from '../ui/button';

interface ReportsTableHeaderProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  hasActiveFilters: boolean;
  filtersCount: number;
  onClearFilters: () => void;
}

export const ReportsTableHeader = ({
  showFilters,
  setShowFilters,
  hasActiveFilters,
  filtersCount,
  onClearFilters,
}: ReportsTableHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <Button
        variant="outline"
        size="sm"
        className="gap-2 transition-all duration-200"
        onClick={() => setShowFilters(!showFilters)}
      >
        <Filter className="h-4 w-4" />
        {showFilters ? 'Hide filters' : 'Filters'}
        {hasActiveFilters && (
          <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            {filtersCount}
          </span>
        )}
      </Button>
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="gap-2 text-muted-foreground"
        >
          <X className="h-4 w-4" />
          Clear filters
        </Button>
      )}
    </div>
  );
};
