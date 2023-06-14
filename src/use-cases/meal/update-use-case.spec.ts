import { MealRepository } from "src/repository/meal-repository";
import { CreateMealUseCase } from "./create-use-case";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryMealRepository } from "src/repository/In-memory/in-memory-meal-repository";
import { InMemoryUserRepository } from "src/repository/In-memory/in-memory-user-repository";
import { UserRepository } from "src/repository/user-repository";
import { CreateUserUseCase } from "../user/create-use-case";
import { FindByIdUseCase } from "./find-by-id-use-case";
import { MealNotFound } from "./errors/meal-not-found";
import { UpdateUseCase } from "./update-use-case";

let mealRepository: MealRepository;
let createMealUseCase: CreateMealUseCase;
let usersRepository: UserRepository;
let createUserUseCase: CreateUserUseCase;
let findByIdUseCase: FindByIdUseCase;
let updateUseCase: UpdateUseCase;

beforeEach(() => {
  usersRepository = new InMemoryUserRepository();
  mealRepository = new InMemoryMealRepository();
  createUserUseCase = new CreateUserUseCase(usersRepository);
  createMealUseCase = new CreateMealUseCase(mealRepository, usersRepository);
  findByIdUseCase = new FindByIdUseCase(mealRepository);
  updateUseCase = new UpdateUseCase(mealRepository, usersRepository);
});

describe("Update Meal", () => {
  it("should to delete meal", async () => {
    await createUserUseCase.execute({
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

    await updateUseCase.execute({
      id: 1,
      name: "Test",
      userId: 1,
    });

    let meal = await findByIdUseCase.execute(1);

    expect(meal?.name).toEqual("Test");
  });

  it("should not to update meal not exists", async () => {
    await expect(async () => {
      await updateUseCase.execute({ id: 1 });
    }).rejects.toBeInstanceOf(MealNotFound);
  });
});
