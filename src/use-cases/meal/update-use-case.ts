import { UserRepository } from "src/repository/user-repository";
import { MealRepository, MealUpdate } from "../../repository/meal-repository";
import { MealNotFound } from "./errors/meal-not-found";
import { UserNotFound } from "../user/errors/user-not-found";

export class UpdateUseCase {
  constructor(
    private mealRepository: MealRepository,
    private userRepository: UserRepository
  ) {}

  async execute({ id, userId, ...data }: MealUpdate) {
    const meal = await this.mealRepository.findById(id);

    if (!meal) throw new MealNotFound();

    if (userId) {
      const user = this.userRepository.findById(userId);
      if (!user) throw new UserNotFound();
    }

    await this.mealRepository.update({ id, ...data });

    return;
  }
}
