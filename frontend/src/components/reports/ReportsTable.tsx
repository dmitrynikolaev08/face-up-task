import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { FileText, Loader2, SortAsc, SortDesc } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Report } from '@/api/model';
import { useGetApiReports } from '@/api/reports/reports';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDebounce } from '@/hooks/useDebounce';

import { ReportsFilters } from './ReportsFilters';
import { ReportsPagination } from './ReportsPagination';
import { ReportsTableHeader } from './ReportsTableHeader';

const SortableHeader = ({
  column,
  children,
}: {
  column: Column<Report, unknown>;
  children: React.ReactNode;
}) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    className="p-0 hover:bg-transparent"
  >
    {children}
    {column.getIsSorted() === 'asc' ? (
      <SortAsc className="ml-2 h-4 w-4" />
    ) : (
      <SortDesc className="ml-2 h-4 w-4" />
    )}
  </Button>
);

const columns: ColumnDef<Report>[] = [
  {
    accessorKey: 'senderName',
    header: ({ column }) => (
      <SortableHeader column={column}>Sender Name</SortableHeader>
    ),
  },
  {
    accessorKey: 'senderAge',
    header: ({ column }) => (
      <SortableHeader column={column}>Age</SortableHeader>
    ),
  },
  {
    accessorKey: 'message',
    header: 'Message',
    cell: ({ row }) => {
      const message = row.getValue('message') as string;
      return (
        <div className="max-h-[2.5rem] line-clamp-2 overflow-hidden text-sm text-muted-foreground">
          {message}
        </div>
      );
    },
  },
  {
    accessorKey: 'files',
    header: 'Files',
    cell: ({ row }) => {
      const files = row.original.files || [];
      return (
        <div className="flex items-center gap-1">
          <FileText className="h-4 w-4" />
          <span>{files.length}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <SortableHeader column={column}>Date</SortableHeader>
    ),
    cell: ({ row }) => new Date(row.original.createdAt!).toLocaleDateString(),
  },
];

export const ReportsTable = () => {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Filter states
  const [nameFilter, setNameFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [messageFilter, setMessageFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Debounced filters
  const debouncedName = useDebounce(nameFilter);
  const debouncedAge = useDebounce(ageFilter);
  const debouncedMessage = useDebounce(messageFilter);
  const debouncedDate = useDebounce(dateFilter);

  // API parameters
  const filterParams = Object.fromEntries(
    columnFilters.map((filter) => [filter.id, filter.value]),
  );

  const sortParams =
    sorting.length > 0
      ? {
          sortField: sorting[0].id,
          sortDirection: sorting[0].desc ? 'desc' : 'asc',
        }
      : undefined;

  const { data, isLoading } = useGetApiReports({
    page,
    limit,
    ...filterParams,
    ...sortParams,
  });

  // Reset page when filters or sorting change
  useEffect(() => {
    setPage(1);
  }, [sorting, columnFilters]);

  // Update filters when debounced values change
  useEffect(() => {
    const newFilters: ColumnFiltersState = [];
    if (debouncedName)
      newFilters.push({ id: 'senderName', value: debouncedName });
    if (debouncedAge) newFilters.push({ id: 'senderAge', value: debouncedAge });
    if (debouncedMessage)
      newFilters.push({ id: 'message', value: debouncedMessage });
    if (debouncedDate)
      newFilters.push({ id: 'createdAt', value: debouncedDate });
    setColumnFilters(newFilters);
  }, [debouncedName, debouncedAge, debouncedMessage, debouncedDate]);

  const handleRowClick = (reportId: string) => {
    navigate(`/reports/${reportId}`);
  };

  const clearFilters = () => {
    setNameFilter('');
    setAgeFilter('');
    setMessageFilter('');
    setDateFilter('');
    setColumnFilters([]);
  };

  const table = useReactTable({
    data: data?.reports || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    manualSorting: true,
    manualFiltering: true,
    pageCount: Math.ceil((data?.total || 0) / limit),
    state: {
      sorting,
      columnFilters,
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ReportsTableHeader
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        hasActiveFilters={columnFilters.length > 0}
        filtersCount={columnFilters.length}
        onClearFilters={clearFilters}
      />

      {showFilters && (
        <ReportsFilters
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
          ageFilter={ageFilter}
          setAgeFilter={setAgeFilter}
          messageFilter={messageFilter}
          setMessageFilter={setMessageFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />
      )}

      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleRowClick(row.original.id!)}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <ReportsPagination
        page={page}
        setPage={setPage}
        total={data?.total || 0}
        limit={limit}
      />
    </div>
  );
};
