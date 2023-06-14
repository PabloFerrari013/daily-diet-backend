import { Request, Response } from "express";
import { MealNotFound } from "src/use-cases/meal/errors/meal-not-found";
import { makeCreateMealUseCase } from "src/use-cases/meal/factory/make-create-use-case";
import { makeDeleteMealUseCase } from "src/use-cases/meal/factory/make-delete-use-case";
import { makeFindMealUseCase } from "src/use-cases/meal/factory/make-find-use-case";
import { makeListMealByUserUseCase } from "src/use-cases/meal/factory/make-list-by-user-use-case";
import { makeUpdateMealUseCase } from "src/use-cases/meal/factory/make-update-use-case";
import { z } from "zod";

export class MealController {
  async create(req: Request, res: Response) {
    try {
      let bodySchema = z.object({
        name: z.string(),
        description: z.string(),
        isDiet: z.coerce.string(z.boolean()),
      });

      let bodySchemaResponse = bodySchema.safeParse(req.body);

      if (!bodySchemaResponse.success) {
        console.log(bodySchemaResponse.error);
        return res.status(400).send("Check that all fields are filled in");
      }

      const userId = Number(req.user?.id);

      const useCase = makeCreateMealUseCase();

      let data = bodySchemaResponse.data;

      const meal = await useCase.execute({
        ...data,
        userId,
      });

      return res.status(201).json(meal);
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .send("There was an internal conflict, please try again later!");
    }
  }

  async find(req: Request, res: Response) {
    try {
      const useCase = makeFindMealUseCase();

      let data = await useCase.execute(Number(req.params.id));

      if (!data) {
        return res.status(404).send("Meal not found!");
      }

      return res.json(data);
    } catch (error) {
      return res
        .status(500)
        .send("There was an internal conflict, please try again later!");
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      let bodySchema = z.object({
        name: z.string(),
        desciption: z.string().optional(),
        isDiet: z.coerce.string().optional(),
      });

      let bodySchemaResponse = bodySchema.safeParse(req.body);

      if (!bodySchemaResponse.success) {
        console.log(bodySchemaResponse.error);
        return res.status(400).send("Check that all fields are filled in");
      }

      const useCase = makeUpdateMealUseCase();

      const Meal = await useCase.execute({
        id: Number(id),
        ...bodySchemaResponse.data,
      });

      return res.json(Meal);
    } catch (error) {
      if (error instanceof MealNotFound) {
        return res.status(404).send("Meal not found!");
      }

      return res
        .status(500)
        .send("There was an internal conflict, please try again later!");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const useCase = makeDeleteMealUseCase();

      const Meal = await useCase.execute(Number(id));

      return res.json(Meal);
    } catch (error) {
      if (error instanceof MealNotFound) {
        return res.status(404).send("Meal not found!");
      }

      return res
        .status(500)
        .send("There was an internal conflict, please try again later!");
    }
  }

  async listByUser(req: Request, res: Response) {
    try {
      const userId = Number(req.user?.id);

      const useCase = makeListMealByUserUseCase();

      let data = await useCase.execute(userId);

      return res.json(data);
    } catch (error) {
      return res
        .status(500)
        .send("There was an internal conflict, please try again later!");
    }
  }
}
