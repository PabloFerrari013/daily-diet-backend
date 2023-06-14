import { MealRepository } from "../../repository/meal-repository";
import { MealNotFound } from "./errors/meal-not-found";

export class DeleteMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute(id: number) {
    const meal = await this.mealRepository.findById(id);

    if (!meal) throw new MealNotFound();

    await this.mealRepository.delete(id);
  }
}
