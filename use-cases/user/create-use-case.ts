import { UserRepository } from "./../../repository/user-repository";
import { User } from "@prisma/client";
import { UserAlreadyExists } from "./errors/user-already-exists";

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: User) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) throw new UserAlreadyExists();

    const user = await this.userRepository.create(data);

    return user;
  }
}
