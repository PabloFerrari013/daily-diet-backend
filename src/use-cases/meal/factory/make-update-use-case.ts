import { PrismaMealRepository } from "src/repository/Prisma/prisma-meal-repository";
import { UpdateUseCase } from "../update-use-case";

export function makeUpdateMealUseCase() {
  const repository = new PrismaMealRepository();
  const useCase = new UpdateUseCase(repository);
  return useCase;
}
