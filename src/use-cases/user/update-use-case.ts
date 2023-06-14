import { UserRepository, UserUpdate } from "../../repository/user-repository";
import { UserNotFound } from "./errors/user-not-found";

export class UpdateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id, ...data }: UserUpdate) {
    const user = await this.userRepository.findById(id);

    if (!user) throw new UserNotFound();

    await this.userRepository.update({ id, ...data });

    return;
  }
}
