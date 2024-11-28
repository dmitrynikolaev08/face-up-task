import { Search } from 'lucide-react';
import { useRef } from 'react';

import { Input } from '../ui/input';

interface ReportsFiltersProps {
  nameFilter: string;
  setNameFilter: (value: string) => void;
  ageFilter: string;
  setAgeFilter: (value: string) => void;
  messageFilter: string;
  setMessageFilter: (value: string) => void;
  dateFilter: string;
  setDateFilter: (value: string) => void;
}

export const ReportsFilters = ({
  nameFilter,
  setNameFilter,
  ageFilter,
  setAgeFilter,
  messageFilter,
  setMessageFilter,
  dateFilter,
  setDateFilter,
}: ReportsFiltersProps) => {
  // Create refs for each input
  const nameInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Helper function to update value while maintaining focus
  const updateValueWithFocus = (
    value: string,
    setter: (value: string) => void,
    ref: React.RefObject<HTMLInputElement>,
  ) => {
    setter(value);
    // Store current selection/cursor position
    const selectionStart = ref.current?.selectionStart;
    const selectionEnd = ref.current?.selectionEnd;

    // After state update, restore the cursor position
    requestAnimationFrame(() => {
      if (
        ref.current &&
        selectionStart !== undefined &&
        selectionEnd !== undefined
      ) {
        ref.current.setSelectionRange(selectionStart, selectionEnd);
      }
    });
  };

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-4">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                ref={nameInputRef}
                placeholder="Filter by name..."
                value={nameFilter}
                onChange={(e) =>
                  updateValueWithFocus(
                    e.target.value,
                    setNameFilter,
                    nameInputRef,
                  )
                }
                className="pl-8"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Age</label>
            <Input
              ref={ageInputRef}
              type="number"
              placeholder="Filter by age..."
              value={ageFilter}
              onChange={(e) =>
                updateValueWithFocus(e.target.value, setAgeFilter, ageInputRef)
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <Input
              ref={messageInputRef}
              placeholder="Filter by message..."
              value={messageFilter}
              onChange={(e) =>
                updateValueWithFocus(
                  e.target.value,
                  setMessageFilter,
                  messageInputRef,
                )
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Input
              ref={dateInputRef}
              type="date"
              value={dateFilter}
              onChange={(e) =>
                updateValueWithFocus(
                  e.target.value,
                  setDateFilter,
                  dateInputRef,
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
