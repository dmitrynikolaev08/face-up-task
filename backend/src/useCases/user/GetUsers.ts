import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/interfaces/UserRepository';

export class GetUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}