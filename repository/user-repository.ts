import { Prisma, User } from "@prisma/client";

export interface UserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  delete(id: number): Promise<void>;
  update(data: User): Promise<void>;
}