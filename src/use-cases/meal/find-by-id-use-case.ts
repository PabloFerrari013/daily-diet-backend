import { MealRepository } from "src/repository/meal-repository";
import { MealNotFound } from "./errors/meal-not-found";

export class FindByIdUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute(id: number) {
    const meal = await this.mealRepository.findById(id);
    return meal;
  }
}
