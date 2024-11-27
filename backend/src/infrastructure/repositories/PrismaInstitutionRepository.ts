import { Institution } from '../../domain/entities/Institution';
import { InstitutionRepository } from '../../domain/interfaces/InstitutionRepository';
import prisma from '../database/prismaClient';

export class PrismaInstitutionRepository implements InstitutionRepository {
  async create(
    institution: Omit<Institution, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Institution> {
    return prisma.institution
      .create({
        data: institution,
      })
      .then(this.mapInstitution);
  }

  async findAll(): Promise<Institution[]> {
    const institutions = await prisma.institution.findMany();
    return institutions.map(this.mapInstitution);
  }

  async findById(id: string): Promise<Institution | null> {
    const institution = await prisma.institution.findUnique({
      where: { id },
    });
    return institution ? this.mapInstitution(institution) : null;
  }

  async update(
    id: string,
    institution: Partial<Institution>,
  ): Promise<Institution> {
    const updated = await prisma.institution.update({
      where: { id },
      data: institution,
    });
    return this.mapInstitution(updated);
  }

  async delete(id: string): Promise<void> {
    await prisma.institution.delete({
      where: { id },
    });
  }

  private mapInstitution(institution: any): Institution {
    return {
      id: institution.id,
      name: institution.name,
      createdAt: new Date(institution.createdAt),
      updatedAt: new Date(institution.updatedAt),
    };
  }
}
