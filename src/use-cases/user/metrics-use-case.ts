import { MealRepository } from "src/repository/meal-repository";

export class MetricsUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute(userId: number) {
    const metrics = await this.mealRepository.metrics(userId);
    return metrics;
  }
}
