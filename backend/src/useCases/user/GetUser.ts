import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/interfaces/UserRepository';

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
