import { UserRepository } from "./../../repository/user-repository";
import { UserNotFound } from "./errors/user-not-found";
export class FindByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: number) {
    const user = await this.userRepository.findById(id);

    if (!user) throw new UserNotFound();

    return user;
  }
}
