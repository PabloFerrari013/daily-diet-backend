import { Prisma, Meal } from "@prisma/client";
import {
  BestDay,
  MealRepository,
  MealUpdate,
  Metrics,
} from "../meal-repository";
import dayjs from "dayjs";

interface Group {
  [x: string]: Meal[];
}

export class InMemoryMealRepository implements MealRepository {
  private items: Meal[] = [];

  async update({ id, ...data }: MealUpdate): Promise<void> {
    const mealIndex = this.items.findIndex((meal) => meal.id === id);

    this.items[mealIndex] = { ...this.items[mealIndex], ...data };
  }

  async create(data: Prisma.MealUncheckedCreateInput): Promise<Meal> {
    let id = data.id || this.items[this.items.length - 1]?.id + 1 || 1;

    const meal: Meal = {
      ...data,
      id,
      created_at: new Date(),
    };

    this.items.push(meal);
    return meal;
  }

  async findById(id: number): Promise<Meal | null> {
    return this.items.find((meal) => meal.id === id) || null;
  }

  async delete(id: number): Promise<void> {
    const mealIndex = this.items.findIndex((meal) => meal.id === id);

    this.items.splice(mealIndex, 1);

    console.log(this.items);
  }

  async listByUser(userId: number): Promise<Meal[]> {
    return this.items.filter((meal) => meal.userId === userId) || [];
  }

  async metrics(userId: number): Promise<Metrics> {
    const onTheDiet = this.items.filter(
      (item) => item.isDiet === "true"
    ).length;

    const offTheDiet = this.items.filter(
      (item) => item.isDiet === "false"
    ).length;

    const total = onTheDiet + offTheDiet;

    const meals = this.items.filter((item) => item.isDiet === "true");

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
}
