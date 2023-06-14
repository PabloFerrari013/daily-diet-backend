import { MetricsUseCase } from "../metrics-use-case";
import { PrismaMealRepository } from "src/repository/Prisma/prisma-meal-repository";

export function makeMetricsUseCase() {
  const repository = new PrismaMealRepository();
  const useCase = new MetricsUseCase(repository);
  return useCase;
}
