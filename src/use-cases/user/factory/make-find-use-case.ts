import { FindByIdUseCase } from "./../find-by-id-use-case";
import { PrismaUserRepository } from "src/repository/Prisma/prisma-user-repository";

export function makeFindUserUseCase() {
  const repository = new PrismaUserRepository();
  const useCase = new FindByIdUseCase(repository);
  return useCase;
}
