import { PrismaMealRepository } from "src/repository/Prisma/prisma-meal-repository";
import { CreateMealUseCase } from "../create-use-case";
import { PrismaUserRepository } from "src/repository/Prisma/prisma-user-repository";

export function makeCreateMealUseCase() {
  const mealRepository = new PrismaMealRepository();
  const userRepository = new PrismaUserRepository();
  const useCase = new CreateMealUseCase(mealRepository, userRepository);
  return useCase;
}
