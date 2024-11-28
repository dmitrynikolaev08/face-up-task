import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

interface ReportsPaginationProps {
  page: number;
  setPage: (page: number) => void;
  total: number;
  limit: number;
}

export const ReportsPagination = ({
  page,
  setPage,
  total,
  limit,
}: ReportsPaginationProps) => {
  return (
    <div className="flex items-center justify-between align-center pt-5">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage(Math.max(1, page - 1))}
              isActive={page !== 1}
              className="hover:cursor-pointer"
            />
          </PaginationItem>

          {Array.from({ length: Math.ceil(total / limit) }).map((_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink
                onClick={() => setPage(i + 1)}
                isActive={page === i + 1}
                className="hover:cursor-pointer"
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => setPage(page + 1)}
              isActive={page < Math.ceil(total / limit)}
              className="hover:cursor-pointer"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
