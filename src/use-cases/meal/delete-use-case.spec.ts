import { MealRepository } from "src/repository/meal-repository";
import { CreateMealUseCase } from "./create-use-case";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryMealRepository } from "src/repository/In-memory/in-memory-meal-repository";
import { InMemoryUserRepository } from "src/repository/In-memory/in-memory-user-repository";
import { UserRepository } from "src/repository/user-repository";
import { CreateUserUseCase } from "../user/create-use-case";
import { UserNotFound } from "../user/errors/user-not-found";
import { DeleteMealUseCase } from "./delete-use-case";
import { FindByIdUseCase } from "./find-by-id-use-case";
import { rejects } from "assert";
import { MealNotFound } from "./errors/meal-not-found";

let mealRepository: MealRepository;
let createMealUseCase: CreateMealUseCase;
let usersRepository: UserRepository;
let createUserUseCase: CreateUserUseCase;
let deleteMealUseCase: DeleteMealUseCase;
let findByIdUseCase: FindByIdUseCase;

beforeEach(() => {
  mealRepository = new InMemoryMealRepository();
  usersRepository = new InMemoryUserRepository();
  createUserUseCase = new CreateUserUseCase(usersRepository);
  createMealUseCase = new CreateMealUseCase(mealRepository, usersRepository);
  deleteMealUseCase = new DeleteMealUseCase(mealRepository);
  findByIdUseCase = new FindByIdUseCase(mealRepository);
});

describe("Delete Meal", () => {
  it("should to delete meal", async () => {
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

    await deleteMealUseCase.execute(1);

    let meal = await findByIdUseCase.execute(1);

    expect(meal).toEqual(null);
  });

  it("should not to delete meal not exists", async () => {
    await expect(async () => {
      await deleteMealUseCase.execute(1);
    }).rejects.toBeInstanceOf(MealNotFound);
  });
});
