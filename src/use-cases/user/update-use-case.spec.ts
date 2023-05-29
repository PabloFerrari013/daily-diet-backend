import { CreateUserUseCase } from "./create-use-case";
import { UserRepository } from "../../repository/user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../../repository/In-memory/in-memory-user-repository";
import { FindByIdUseCase } from "./find-by-id-use-case";
import { UserNotFound } from "./errors/user-not-found";
import { UpdateUseCase } from "./update-use-case";

let usersRepository: UserRepository;
let createUserUseCase: CreateUserUseCase;
let updateUseCase: UpdateUseCase;
let findByIdUseCase: FindByIdUseCase;

beforeEach(() => {
  usersRepository = new InMemoryUserRepository();
  createUserUseCase = new CreateUserUseCase(usersRepository);
  updateUseCase = new UpdateUseCase(usersRepository);
  findByIdUseCase = new FindByIdUseCase(usersRepository);
});

describe("Update User", () => {
  it("should to update a user", async () => {
    const user = await createUserUseCase.execute({
      created_at: new Date(),
      email: "pablo@test.com",
      name: "Pablo",
    });

    await updateUseCase.execute({ name: "New name", id: user.id });

    const getUser = await findByIdUseCase.execute(user.id);

    expect(getUser.name).toEqual("New name");
  });

  it("should not to update a user unexpected", async () => {
    await expect(async () => {
      await updateUseCase.execute({ id: 1, name: "" });
    }).rejects.toBeInstanceOf(UserNotFound);
  });
});
