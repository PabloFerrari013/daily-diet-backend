import { Meal, Prisma } from "@prisma/client";

export interface MealUpdate {
  id: number;
  name?: string;
  description?: string;
  isDiet?: string;
  userId?: number;
}

export interface BestDay {
  day: string;
  meals: Meal[];
}

export interface Metrics {
  onTheDiet: number;
  offTheDiet: number;
  total: number;
  bestDay: BestDay | null;
}

export interface MealRepository {
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>;
  findById(id: number): Promise<Meal | null>;
  delete(id: number): Promise<void>;
  update(data: MealUpdate): Promise<void>;
  listByUser(userId: number): Promise<Meal[]>;
  metrics(userId: number): Promise<Metrics>;
}
