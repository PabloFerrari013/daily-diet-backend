import { MealRepository } from "src/repository/meal-repository";
import { CreateMealUseCase } from "./create-use-case";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryMealRepository } from "src/repository/In-memory/in-memory-meal-repository";
import { InMemoryUserRepository } from "src/repository/In-memory/in-memory-user-repository";
import { UserRepository } from "src/repository/user-repository";
import { CreateUserUseCase } from "../user/create-use-case";
import { UserNotFound } from "../user/errors/user-not-found";

let mealRepository: MealRepository;
let createMealUseCase: CreateMealUseCase;
let usersRepository: UserRepository;
let createUserUseCase: CreateUserUseCase;

beforeEach(() => {
  mealRepository = new InMemoryMealRepository();
  usersRepository = new InMemoryUserRepository();
  createUserUseCase = new CreateUserUseCase(usersRepository);
  createMealUseCase = new CreateMealUseCase(mealRepository, usersRepository);
});

describe("Create Meal", () => {
  it("should to create a new meal", async () => {
    const user = await createUserUseCase.execute({
      email: "pablo@test.com",
      name: "Pablo",
      password: "root",
      id: 1,
    });

    const meal = await createMealUseCase.execute({
      name: "meal",
      description: "description",
      isDiet: "true",
      userId: 1,
      id: 1,
    });

    expect(meal.id).toEqual(1);
  });

  it("should not to create a new meal if user not exist", async () => {
    await expect(async () => {
      await createMealUseCase.execute({
        name: "meal",
        description: "description",
        isDiet: "true",
        userId: 1,
        id: 1,
      });
    }).rejects.toBeInstanceOf(UserNotFound);
  });
});
