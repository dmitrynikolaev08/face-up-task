import { Institution } from '../../domain/entities/Institution';
import { InstitutionRepository } from '../../domain/interfaces/InstitutionRepository';

export class GetInstitutionByIdUseCase {
  constructor(private institutionRepository: InstitutionRepository) {}

  async execute(id: string): Promise<Institution | null> {
    return this.institutionRepository.findById(id);
  }
}
