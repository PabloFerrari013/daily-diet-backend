import { Prisma, Meal } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { MealRepository, MealUpdate } from "../meal-repository";
import dayjs from "dayjs";

interface Group {
  [x: string]: Meal[];
}

interface BestDay {
  day: string;
  meals: Meal[];
}

export class PrismaMealRepository implements MealRepository {
  async metrics(userId: number) {
    const onTheDiet = await prisma.meal.count({ where: { isDiet: "true" } });
    const offTheDiet = await prisma.meal.count({ where: { isDiet: "false" } });
    const total = onTheDiet + offTheDiet;

    const meals = await prisma.meal.findMany({
      where: {
        isDiet: "true",
        userId,
      },
      orderBy: {
        created_at: "asc",
      },
    });

    const bestDay = await new Promise<BestDay | null>(
      async (resolve, reject) => {
        let group: Group = {};
        let bestDay: BestDay | null = null;

        for await (const item of meals) {
          let createdAt = dayjs(item.created_at).format("YYYY_MM_DD");

          if (group[`${createdAt}`]) {
            group[`${createdAt}`] = [...group[`${createdAt}`], item];
          } else {
            group = {
              ...group,
              [`${createdAt}`]: [item],
            };
          }
        }

        for await (const item of Object.entries(group)) {
          let day = item[0].split("_").join("/");

          if (!bestDay) {
            bestDay = { day, meals: item[1] };
          }

          if (bestDay && bestDay.meals.length < group[item[0]].length) {
            bestDay = { day, meals: item[1] };
          }
        }

        resolve(bestDay);
      }
    );

    return {
      onTheDiet,
      offTheDiet,
      total,
      bestDay,
    };
  }

  async listByUser(userId: number): Promise<Meal[]> {
    const meals = await prisma.meal.findMany({ where: { userId } });
    return meals;
  }

  async findById(id: number): Promise<Meal | null> {
    const meal = await prisma.meal.findUnique({ where: { id } });
    return meal;
  }

  async delete(id: number): Promise<void> {
    await prisma.meal.delete({ where: { id } });
  }

  async update({ id, ...data }: MealUpdate): Promise<void> {
    await prisma.meal.update({ where: { id: id }, data: { ...data } });
  }

  async create(data: Prisma.MealUncheckedCreateInput): Promise<Meal> {
    const Meal = await prisma.meal.create({ data });
    return Meal;
  }
}
