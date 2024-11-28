import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  FileText,
  Filter,
  Loader2,
  Search,
  SortAsc,
  SortDesc,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Report } from '@/api/model';
import { useGetApiReports } from '@/api/reports/reports';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const columns: ColumnDef<Report>[] = [
  {
    accessorKey: 'senderName',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="p-0 hover:bg-transparent"
      >
        Sender Name
        {column.getIsSorted() === 'asc' ? (
          <SortAsc className="ml-2 h-4 w-4" />
        ) : (
          <SortDesc className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
  },
  {
    accessorKey: 'senderAge',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="p-0 hover:bg-transparent"
      >
        Age
        {column.getIsSorted() === 'asc' ? (
          <SortAsc className="ml-2 h-4 w-4" />
        ) : (
          <SortDesc className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
  },
  {
    accessorKey: 'message',
    header: 'Message',
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
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="p-0 hover:bg-transparent"
      >
        Date
        {column.getIsSorted() === 'asc' ? (
          <SortAsc className="ml-2 h-4 w-4" />
        ) : (
          <SortDesc className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
    cell: ({ row }) => new Date(row.original.createdAt!).toLocaleDateString(),
  },
];

export const ReportsTable = () => {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [showFilters, setShowFilters] = useState(false);
  const { data: reports, isLoading } = useGetApiReports();

  const handleRowClick = (reportId: string) => {
    navigate(`/reports/${reportId}`);
  };

  const table = useReactTable({
    data: reports || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const clearFilters = () => {
    setColumnFilters([]);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const filteredRowsCount = table.getFilteredRowModel().rows.length;
  const totalRowsCount = reports?.length || 0;
  const hasActiveFilters = columnFilters.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {columnFilters.length}
            </span>
          )}
        </Button>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="gap-2 text-muted-foreground"
          >
            <X className="h-4 w-4" />
            Clear filters
          </Button>
        )}
      </div>

      {showFilters && (
        <div className="rounded-lg border bg-card">
          <div className="p-4">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Filter by name..."
                    value={
                      (table
                        .getColumn('senderName')
                        ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                      table
                        .getColumn('senderName')
                        ?.setFilterValue(event.target.value)
                    }
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Age</label>
                <Input
                  type="number"
                  placeholder="Filter by age..."
                  value={
                    (table
                      .getColumn('senderAge')
                      ?.getFilterValue() as string) ?? ''
                  }
                  onChange={(event) =>
                    table
                      .getColumn('senderAge')
                      ?.setFilterValue(event.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Input
                  placeholder="Filter by message..."
                  value={
                    (table.getColumn('message')?.getFilterValue() as string) ??
                    ''
                  }
                  onChange={(event) =>
                    table
                      .getColumn('message')
                      ?.setFilterValue(event.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={
                    (table
                      .getColumn('createdAt')
                      ?.getFilterValue() as string) ?? ''
                  }
                  onChange={(event) =>
                    table
                      .getColumn('createdAt')
                      ?.setFilterValue(event.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
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
      <div className="text-sm text-muted-foreground">
        Showing {filteredRowsCount} of {totalRowsCount} reports
      </div>
    </div>
  );
};
