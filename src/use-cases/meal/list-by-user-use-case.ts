import { MealRepository } from "src/repository/meal-repository";

export class ListByUserUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute(id: number) {
    const meals = await this.mealRepository.listByUser(id);
    return meals;
  }
}
