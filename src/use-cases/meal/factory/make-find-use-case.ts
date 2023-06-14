import { FindByIdUseCase } from "../find-by-id-use-case";
import { PrismaMealRepository } from "src/repository/Prisma/prisma-meal-repository";

export function makeFindMealUseCase() {
  const repository = new PrismaMealRepository();
  const useCase = new FindByIdUseCase(repository);
  return useCase;
}
