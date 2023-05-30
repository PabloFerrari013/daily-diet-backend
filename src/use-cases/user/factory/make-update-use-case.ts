import { PrismaUserRepository } from "src/repository/Prisma/prisma-user-repository";
import { UpdateUseCase } from "../update-use-case";

export function makeUpdateUserUseCase() {
  const repository = new PrismaUserRepository();
  const useCase = new UpdateUseCase(repository);
  return useCase;
}
