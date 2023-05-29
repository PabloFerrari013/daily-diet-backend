import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../user-repository";
import { UserNotFound } from "../../use-cases/user/errors/user-not-found";

interface UserUpdate {
  id: number;
  name?: string;
}

export class InMemoryUserRepository implements UserRepository {
  private items: User[] = [];

  async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
    let id = data.id || this.items[this.items.length - 1].id + 1;

    const user: User = {
      ...data,
      id,
      created_at: new Date(),
    };

    this.items.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.items.find((user) => user.email === email) || null;
  }

  async findById(id: number): Promise<User | null> {
    return this.items.find((user) => user.id === id) || null;
  }

  async delete(id: number): Promise<void> {
    const userIndex = this.items.findIndex((user) => user.id === id);

    if (!userIndex) throw new UserNotFound();

    this.items.splice(userIndex, 1);
  }

  async update(data: UserUpdate): Promise<void> {
    const userIndex = this.items.findIndex((user) => user.id === data.id);

    if (!userIndex) throw new UserNotFound();

    this.items[userIndex] = { ...this.items[userIndex], ...data };
  }
}
