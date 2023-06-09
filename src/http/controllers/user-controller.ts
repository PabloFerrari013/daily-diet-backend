import { Request, Response } from "express";
import { UserAlreadyExists } from "src/use-cases/user/errors/user-already-exists";
import { UserNotFound } from "src/use-cases/user/errors/user-not-found";
import { makeCreateUserUseCase } from "src/use-cases/user/factory/make-create-use-case";
import { makeDeleteUserUseCase } from "src/use-cases/user/factory/make-delete-use-case";
import { makeFindUserUseCase } from "src/use-cases/user/factory/make-find-use-case";
import { makeMetricsUseCase } from "src/use-cases/user/factory/make-metrics-use-case";
import { makeUpdateUserUseCase } from "src/use-cases/user/factory/make-update-use-case";
import { z } from "zod";

export class UserController {
  async create(req: Request, res: Response) {
    try {
      let bodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      });

      let bodySchemaResponse = bodySchema.safeParse(req.body);

      if (!bodySchemaResponse.success) {
        console.log(bodySchemaResponse.error);
        return res.status(400).send("Check that all fields are filled in");
      }

      const useCase = makeCreateUserUseCase();
      const user = await useCase.execute(bodySchemaResponse.data);

      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof UserAlreadyExists) {
        return res.status(406).send("User already exists!");
      }

      console.log(error);

      return res
        .status(500)
        .send("There was an internal conflict, please try again later!");
    }
  }

  async find(req: Request, res: Response) {
    try {
      const useCase = makeFindUserUseCase();

      let user: any = await useCase.execute(Number(req.params.id));

      if (user) user.password = undefined;

      return res.json({ user });
    } catch (error) {
      if (error instanceof UserNotFound) {
        return res.status(404).send("User not found!");
      }

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
      });

      let bodySchemaResponse = bodySchema.safeParse(req.body);

      if (!bodySchemaResponse.success) {
        console.log(bodySchemaResponse.error);
        return res.status(400).send("Check that all fields are filled in");
      }

      const useCase = makeUpdateUserUseCase();

      const user = await useCase.execute({
        id: Number(id),
        name: bodySchemaResponse.data.name,
      });

      return res.json(user);
    } catch (error) {
      if (error instanceof UserNotFound) {
        return res.status(404).send("User not found!");
      }

      return res
        .status(500)
        .send("There was an internal conflict, please try again later!");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const useCase = makeDeleteUserUseCase();

      const user = await useCase.execute(Number(id));

      return res.json(user);
    } catch (error) {
      if (error instanceof UserNotFound) {
        return res.status(404).send("User not found!");
      }

      return res
        .status(500)
        .send("There was an internal conflict, please try again later!");
    }
  }

  async metrics(req: Request, res: Response) {
    try {
      const userId = Number(req.user?.id);

      const useCase = makeMetricsUseCase();

      let data = await useCase.execute(userId);

      return res.json(data);
    } catch (error) {
      return res
        .status(500)
        .send("There was an internal conflict, please try again later!");
    }
  }
}
