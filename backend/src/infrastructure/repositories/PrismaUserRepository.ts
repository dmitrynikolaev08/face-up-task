import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/interfaces/UserRepository';
import prisma from '../database/prismaClient';

export class PrismaUserRepository implements UserRepository {
  async create(
    user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User> {
    return prisma.user.create({
      data: user,
    });
  }

  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: user,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }
}
