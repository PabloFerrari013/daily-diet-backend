import { PrismaMealRepository } from "src/repository/Prisma/prisma-meal-repository";
import { DeleteMealUseCase } from "../delete-use-case";

export function makeDeleteMealUseCase() {
  const repository = new PrismaMealRepository();
  const useCase = new DeleteMealUseCase(repository);

  return useCase;
}
