import { Prisma, User } from "@prisma/client";
interface UserUpdate {
  id: number;
  name?: string;
}

export interface UserRepository {
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  delete(id: number): Promise<void>;
  update(data: UserUpdate): Promise<void>;
}
