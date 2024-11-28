import { PrismaReportRepository } from '../../../infrastructure/repositories/PrismaReportRepository';
import { prismaMock } from '../../setup';
import { Report, ReportFile } from '../../../domain/entities/Report';

describe('PrismaReportRepository', () => {
  let repository: PrismaReportRepository;
  const mockReport = {
    id: '1',
    senderName: 'John Doe',
    senderAge: 25,
    message: 'Test message',
    institutionId: '1',
    files: '[]',
    createdAt: new Date(),
    updatedAt: new Date(),
    institution: { name: 'Test Institution' },
  };

  beforeEach(() => {
    repository = new PrismaReportRepository();
  });

  describe('findAll', () => {
    it('should return paginated reports', async () => {
      prismaMock.report.findMany.mockResolvedValue([mockReport]);
      prismaMock.report.count.mockResolvedValue(1);

      const result = await repository.findAll(1, 10);

      expect(result.reports).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(prismaMock.report.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: { createdAt: 'desc' },
        skip: 0,
        take: 10,
        include: {
          institution: {
            select: {
              name: true,
            },
          },
        },
      });
    });

    it('should apply filters correctly', async () => {
      const filters = {
        senderName: 'John',
        senderAge: 25,
        message: 'test',
        createdAt: '2024-03-20',
      };

      await repository.findAll(1, 10, filters);

      expect(prismaMock.report.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            senderName: { contains: 'John' },
            senderAge: 25,
            message: { contains: 'test' },
            createdAt: {
              gte: new Date('2024-03-20'),
              lt: new Date('2024-03-21'),
            },
          },
        })
      );
    });

    it('should apply sorting correctly', async () => {
      const sort = {
        field: 'senderName',
        direction: 'asc' as const,
      };

      await repository.findAll(1, 10, undefined, sort);

      expect(prismaMock.report.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { senderName: 'asc' },
        })
      );
    });

    it('should use default pagination values', async () => {
      prismaMock.report.findMany.mockResolvedValue([]);
      prismaMock.report.count.mockResolvedValue(0);

      await repository.findAll();

      expect(prismaMock.report.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 0,
          take: 10,
        })
      );
    });
  });

  describe('findById', () => {
    it('should return report by id', async () => {
      prismaMock.report.findUnique.mockResolvedValue(mockReport);

      const result = await repository.findById('1');

      expect(result).toBeDefined();
      expect(result?.id).toBe('1');
    });

    it('should return null for non-existent report', async () => {
      prismaMock.report.findUnique.mockResolvedValue(null);

      const result = await repository.findById('non-existent');

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new report', async () => {
      const newReport = {
        senderName: 'John Doe',
        senderAge: 25,
        message: 'Test message',
        institutionId: '1',
        files: [] as ReportFile[],
      };

      prismaMock.report.create.mockResolvedValue({
        ...mockReport,
        files: '[]',
      });

      const result = await repository.create(newReport);

      expect(result.senderName).toBe(newReport.senderName);
      expect(prismaMock.report.create).toHaveBeenCalledWith({
        data: {
          ...newReport,
          files: '[]',
        },
      });
    });
  });

  describe('update', () => {
    it('should update a report', async () => {
      const testDate = new Date('2024-03-20T12:00:00Z');
      const updateData = {
        senderName: 'Jane Doe',
        files: [{
          id: '1',
          filename: 'test.pdf',
          path: '/test.pdf',
          createdAt: testDate
        }],
      };

      const mockUpdatedReport = {
        ...mockReport,
        senderName: updateData.senderName,
        files: JSON.stringify(updateData.files),
        institution: { name: 'Test Institution' },
      };

      prismaMock.report.update.mockResolvedValue(mockUpdatedReport);

      const result = await repository.update('1', updateData);

      expect(result.senderName).toBe(updateData.senderName);
      expect(JSON.stringify(result.files)).toBe(JSON.stringify(updateData.files));
      expect(prismaMock.report.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: {
          senderName: updateData.senderName,
          files: JSON.stringify(updateData.files),
        },
      });
    });

    it('should update a report without files', async () => {
      const updateData = {
        senderName: 'Jane Doe',
      };

      prismaMock.report.update.mockResolvedValue({
        ...mockReport,
        ...updateData,
      });

      const result = await repository.update('1', updateData);

      expect(result.senderName).toBe(updateData.senderName);
      expect(prismaMock.report.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateData,
      });
    });
  });

  describe('delete', () => {
    it('should delete a report', async () => {
      await repository.delete('1');

      expect(prismaMock.report.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });
});
