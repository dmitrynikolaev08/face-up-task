import { Institution } from '../../domain/entities/Institution';
import { InstitutionRepository } from '../../domain/interfaces/InstitutionRepository';

export class GetInstitutionsUseCase {
  constructor(private institutionRepository: InstitutionRepository) {}

  async execute(): Promise<Institution[]> {
    return this.institutionRepository.findAll();
  }
}
