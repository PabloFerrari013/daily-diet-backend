import { PrismaMealRepository } from "src/repository/Prisma/prisma-meal-repository";
import { ListByUserUseCase } from "../list-by-user-use-case";

export function makeListMealByUserUseCase() {
  const repository = new PrismaMealRepository();
  const useCase = new ListByUserUseCase(repository);
  return useCase;
}
