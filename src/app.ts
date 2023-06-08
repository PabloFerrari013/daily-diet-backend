import cors from "cors";
import passport from "passport";
import passportConfig from "./lib/passport";
import session from "express-session";
import { env } from "./env";
import { PrismaUserRepository } from "./repository/Prisma/prisma-user-repository";
import { router } from "./http/router";
import express from "express";

export const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(
  passport.session({
    pauseStream: true,
  })
);

app.use(passport.initialize());
passportConfig({ passport, usersRepository: new PrismaUserRepository() });

app.use("/", router);
