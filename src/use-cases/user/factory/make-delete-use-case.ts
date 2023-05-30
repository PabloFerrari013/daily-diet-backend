import { PrismaUserRepository } from "src/repository/Prisma/prisma-user-repository";
import { DeleteUserUseCase } from "../delete-use-case";

export function makeDeleteUserUseCase() {
  const repository = new PrismaUserRepository();
  const useCase = new DeleteUserUseCase(repository);

  return useCase;
}
