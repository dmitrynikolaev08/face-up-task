import { GetReportsUseCase } from '../../../useCases/report/GetReports';
import { PrismaReportRepository } from '../../../infrastructure/repositories/PrismaReportRepository';
import { prismaMock } from '../../setup';

describe('GetReportsUseCase', () => {
  let getReportsUseCase: GetReportsUseCase;
  let reportRepository: PrismaReportRepository;

  beforeEach(() => {
    reportRepository = new PrismaReportRepository();
    getReportsUseCase = new GetReportsUseCase(reportRepository);
  });

  it('should use default pagination values', async () => {
    prismaMock.report.findMany.mockResolvedValue([]);
    prismaMock.report.count.mockResolvedValue(0);

    await getReportsUseCase.execute();

    expect(prismaMock.report.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: 0,
        take: 10,
      })
    );
  });

  it('should apply filters and sorting', async () => {
    const filters = {
      senderName: 'John',
      senderAge: 25,
    };
    const sort = {
      field: 'createdAt',
      direction: 'desc' as const,
    };

    prismaMock.report.findMany.mockResolvedValue([]);
    prismaMock.report.count.mockResolvedValue(0);

    await getReportsUseCase.execute(1, 10, filters, sort);

    expect(prismaMock.report.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          senderName: { contains: 'John' },
          senderAge: 25,
        },
        orderBy: { createdAt: 'desc' },
        skip: 0,
        take: 10,
      })
    );
  });
}); 