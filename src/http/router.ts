import passport from "passport";
import { AuthController } from "./controllers/auth-controller";
import { UserController } from "./controllers/user-controller";
import { Router } from "express";

export const router = Router();

const userController = new UserController();
const authController = new AuthController();

router.post("/user", userController.create);
router.get("/user/:id", passport.authenticate("jwt"), userController.find);
router.put("/user/:id", passport.authenticate("jwt"), userController.update);
router.delete("/user/:id", passport.authenticate("jwt"), userController.delete);

router.post("/auth/login", authController.login);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("/");
  res.send("Logged in!");
});
