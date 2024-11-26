import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/interfaces/UserRepository';

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(name: string, age: number): Promise<User> {
    return this.userRepository.create({ name, age });
  }
}
