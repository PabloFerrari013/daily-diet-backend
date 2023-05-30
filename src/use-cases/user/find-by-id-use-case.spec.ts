import { CreateUserUseCase } from "./create-use-case";
import { UserRepository } from "../../repository/user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../../repository/In-memory/in-memory-user-repository";
import { UserAlreadyExists } from "./errors/user-already-exists";
import { FindByIdUseCase } from "./find-by-id-use-case";
import { UserNotFound } from "./errors/user-not-found";

let usersRepository: UserRepository;
let createUserUseCase: CreateUserUseCase;
let findByIdUserUseCase: FindByIdUseCase;

beforeEach(() => {
  usersRepository = new InMemoryUserRepository();
  createUserUseCase = new CreateUserUseCase(usersRepository);
  findByIdUserUseCase = new FindByIdUseCase(usersRepository);
});

describe("Find User", () => {
  it("should to find a user by id", async () => {
    const user = await createUserUseCase.execute({
      created_at: new Date(),
      email: "pablo@test.com",
      name: "Pablo",
      password: "root",
    });

    const getUser = await findByIdUserUseCase.execute(user.id);

    expect(getUser.id).toEqual(1);
  });

  it("should not to find a user unexpected", async () => {
    await expect(async () => {
      await findByIdUserUseCase.execute(1);
    }).rejects.toBeInstanceOf(UserNotFound);
  });
});
