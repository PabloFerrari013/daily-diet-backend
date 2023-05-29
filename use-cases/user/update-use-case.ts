import { UserRepository } from "./../../repository/user-repository";
import { UserNotFound } from "./errors/user-not-found";

interface UserUpdate {
  id: number;
  name: string;
}

export class UpdateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id, name }: UserUpdate) {
    const user = await this.userRepository.findById(id);

    if (!user) throw new UserNotFound();

    await this.userRepository.update({ id, name });

    return;
  }
}
