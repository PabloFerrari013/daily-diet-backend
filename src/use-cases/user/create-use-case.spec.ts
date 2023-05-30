import { CreateUserUseCase } from "./create-use-case";
import { UserRepository } from "../../repository/user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../../repository/In-memory/in-memory-user-repository";
import { UserAlreadyExists } from "./errors/user-already-exists";

let usersRepository: UserRepository;
let createUserUseCase: CreateUserUseCase;

beforeEach(() => {
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
      password: "root",
    });

    expect(user.id).toEqual(1);
  });

  it("should not to create a new user wtih duplicate email", async () => {
    const user = {
      created_at: new Date(),
      email: "pablo@test.com",
      name: "Pablo",
      password: "root",
    };

    await createUserUseCase.execute(user);

    await expect(async () => {
      await createUserUseCase.execute(user);
    }).rejects.toBeInstanceOf(UserAlreadyExists);
  });
});
