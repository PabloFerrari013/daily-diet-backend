import { CreateUserUseCase } from "./create-use-case";
import { UserRepository } from "../../repository/user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../../repository/In-memory/in-memory-user-repository";
import { DeleteUserUseCase } from "./delete-use-case";
import { FindByIdUseCase } from "./find-by-id-use-case";
import { UserNotFound } from "./errors/user-not-found";

let usersRepository: UserRepository;
let createUserUseCase: CreateUserUseCase;
let deleteUserUseCase: DeleteUserUseCase;
let findByIdUseCase: FindByIdUseCase;

beforeEach(() => {
  usersRepository = new InMemoryUserRepository();
  createUserUseCase = new CreateUserUseCase(usersRepository);
  deleteUserUseCase = new DeleteUserUseCase(usersRepository);
  findByIdUseCase = new FindByIdUseCase(usersRepository);
});

describe("Delete User", () => {
  it("should to delete a user", async () => {
    await createUserUseCase.execute({
      id: 1,
      email: "pablo@test.com",
      name: "Pablo",
      password: "root",
    });

    await deleteUserUseCase.execute(1);

    let user = await findByIdUseCase.execute(1);

    expect(user).toEqual(null);
  });

  it("should not to delete a user unexpected", async () => {
    await expect(async () => {
      await deleteUserUseCase.execute(1);
    }).rejects.toBeInstanceOf(UserNotFound);
  });
});
