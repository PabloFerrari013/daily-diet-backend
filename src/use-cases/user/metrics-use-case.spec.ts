import { MealRepository } from "src/repository/meal-repository";
import { MetricsUseCase } from "./metrics-use-case";
import { CreateUserUseCase } from "./create-use-case";
import { UserRepository } from "../../repository/user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../../repository/In-memory/in-memory-user-repository";
import { CreateMealUseCase } from "../meal/create-use-case";
import { InMemoryMealRepository } from "src/repository/In-memory/in-memory-meal-repository";

let usersRepository: UserRepository;
let mealRepository: MealRepository;
let createUserUseCase: CreateUserUseCase;
let createMealUseCase: CreateMealUseCase;
let metricsUseCase: MetricsUseCase;

beforeEach(() => {
  usersRepository = new InMemoryUserRepository();
  mealRepository = new InMemoryMealRepository();
  createUserUseCase = new CreateUserUseCase(usersRepository);
  createMealUseCase = new CreateMealUseCase(mealRepository, usersRepository);
  metricsUseCase = new MetricsUseCase(mealRepository);
});

describe("Get User Metrics", () => {
  it("should to get metrics", async () => {
    const user = await createUserUseCase.execute({
      email: "pablo@test.com",
      name: "Pablo",
      password: "root",
    });

    const meal = await createMealUseCase.execute({
      name: "",
      description: "",
      isDiet: "true",
      userId: user.id,
    });

    const metrics = await metricsUseCase.execute(user.id);

    expect(metrics.bestDay?.meals.length).toEqual(1);
    expect(metrics.onTheDiet).toEqual(1);
    expect(metrics.total).toEqual(1);
    expect(metrics.offTheDiet).toEqual(0);
  });
});
