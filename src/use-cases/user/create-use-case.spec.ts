import { CreateUserUseCase } from "./create-use-case";
import { UserRepository } from "../../repository/user-repository";
import { beforeAll, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../../repository/In-memory/in-memory-user-repository";

let usersRepository: UserRepository;
let createUserUseCase: CreateUserUseCase;

beforeAll(() => {
  usersRepository = new InMemoryUserRepository();
  createUserUseCase = new CreateUserUseCase(usersRepository);
});

describe("Create User", () => {
  it("should to create a new user", async () => {
    const createdAt = new Date();
    const user = await createUserUseCase.execute({
      created_at: createdAt,
      email: "pablo@test.com",
      name: "Pablo",
    });

    expect(user).toEqual(
      expect.objectContaining({
        email: "pablo@test.com",
        name: "Pablo",
        created_at: createdAt,
      })
    );
  });
});
