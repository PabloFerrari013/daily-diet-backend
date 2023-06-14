import { MealRepository } from "src/repository/meal-repository";
import { CreateMealUseCase } from "./create-use-case";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryMealRepository } from "src/repository/In-memory/in-memory-meal-repository";
import { InMemoryUserRepository } from "src/repository/In-memory/in-memory-user-repository";
import { UserRepository } from "src/repository/user-repository";
import { CreateUserUseCase } from "../user/create-use-case";
import { FindByIdUseCase } from "./find-by-id-use-case";
import { MealNotFound } from "./errors/meal-not-found";

let mealRepository: MealRepository;
let createMealUseCase: CreateMealUseCase;
let usersRepository: UserRepository;
let createUserUseCase: CreateUserUseCase;
let findByIdUseCase: FindByIdUseCase;

beforeEach(() => {
  mealRepository = new InMemoryMealRepository();
  usersRepository = new InMemoryUserRepository();
  createUserUseCase = new CreateUserUseCase(usersRepository);
  createMealUseCase = new CreateMealUseCase(mealRepository, usersRepository);
  findByIdUseCase = new FindByIdUseCase(mealRepository);
});

describe("Find Meal", () => {
  it("should to find meal", async () => {
    const user = await createUserUseCase.execute({
      email: "pablo@test.com",
      name: "Pablo",
      password: "root",
      id: 1,
    });

    await createMealUseCase.execute({
      name: "meal",
      description: "description",
      isDiet: "true",
      userId: 1,
      id: 1,
    });

    let meal = await findByIdUseCase.execute(1);

    expect(meal?.id).toEqual(1);
  });

  it("should not to find meal not exists", async () => {
    let meal = await findByIdUseCase.execute(1);

    expect(meal).toEqual(null);
  });
});
