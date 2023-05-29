import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../user-repository";
import { prisma } from "../../lib/prisma";

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }

  async delete(id: number): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }

  async update(data: User): Promise<void> {
    await prisma.user.update({ where: { id: data.id }, data });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data });
    return user;
  }
}
