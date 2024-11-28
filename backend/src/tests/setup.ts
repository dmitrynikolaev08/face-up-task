import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

// Create mock prisma client
export const prismaMock = mockDeep<PrismaClient>();

// Mock the actual prisma client module
jest.mock('../infrastructure/database/prismaClient', () => ({
  __esModule: true,
  default: prismaMock,
}));

export type Context = {
  prisma: PrismaClient;
};

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>;
};

export const createMockContext = (): MockContext => {
  return {
    prisma: prismaMock,
  };
};

let context: MockContext = createMockContext();

beforeEach(() => {
  context = createMockContext();
});

export { context }; 