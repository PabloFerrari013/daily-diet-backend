import { UserRepository } from "src/repository/user-repository";
import { MealRepository } from "../../repository/meal-repository";
import { Prisma } from "@prisma/client";
import { UserNotFound } from "../user/errors/user-not-found";

export class CreateMealUseCase {
  constructor(
    private mealRepository: MealRepository,
    private userRepository: UserRepository
  ) {}

  async execute(data: Prisma.MealUncheckedCreateInput) {
    const user = await this.userRepository.findById(data.userId);

    if (!user) throw new UserNotFound();

    const meal = await this.mealRepository.create(data);
    return meal;
  }
}
