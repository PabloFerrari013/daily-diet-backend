import { UserRepository } from "../../repository/user-repository";
import { Prisma, User } from "@prisma/client";
import { UserAlreadyExists } from "./errors/user-already-exists";
import { hashSync, genSaltSync } from "bcrypt";

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, name, password }: Prisma.UserUncheckedCreateInput) {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) throw new UserAlreadyExists();

    const passwordHash = hashSync(password, 10);

    const user = await this.userRepository.create({
      email,
      password: passwordHash,
      name,
    });

    return user;
  }
}
