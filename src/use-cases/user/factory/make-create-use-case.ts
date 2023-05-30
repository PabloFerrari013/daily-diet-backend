import { PrismaUserRepository } from "src/repository/Prisma/prisma-user-repository";
import { CreateUserUseCase } from "../create-use-case";

export function makeCreateUserUseCase() {
  const repository = new PrismaUserRepository();
  const useCase = new CreateUserUseCase(repository);
  return useCase;
}
