import { Institution } from '../entities/Institution';

export interface InstitutionRepository {
  create(
    institution: Omit<Institution, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Institution>;
  findAll(): Promise<Institution[]>;
  findById(id: string): Promise<Institution | null>;
  update(id: string, institution: Partial<Institution>): Promise<Institution>;
  delete(id: string): Promise<void>;
}
