import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import { env } from "src/env";
import { z } from "zod";

export class AuthController {
  public async login(req: Request, res: Response) {
    let bodySchema = z.object({
      email: z.string(),
      password: z.string(),
    });

    let bodySchemaResponse = bodySchema.safeParse(req.body);

    if (!bodySchemaResponse.success) {
      console.log(bodySchemaResponse.error);
      return res.status(400).send("Check that all fields are filled in");
    }

    passport.authenticate(
      "local",
      { session: true },
      (err: any, user: Express.User) => {
        if (err) {
          console.log(err);
          return res.status(500).send();
        }

        if (!user) return res.status(400).send("Invalid email or password.");

        req.login(user, { session: false }, (err) => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }

          const token = jwt.sign(user, env.JWT_SECRET, {
            expiresIn: 1000 * 60 * 60 * 24, // 1 day
          });

          return res.json({ user, token });
        });
      }
    )(req, res);
  }

  public logout(req: Request, res: Response) {
    req.logout((err) => {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }

      const token = jwt.sign({}, env.JWT_SECRET, {
        expiresIn: 1, // 1 day
      });

      const user = {
        id: "",
        name: "",
        email: "",
        departament: "",
      };

      return res.json({ user, token });
    });
  }
}
