import passport from "passport";
import { AuthController } from "./controllers/auth-controller";
import { UserController } from "./controllers/user-controller";
import { Router } from "express";
import { MealController } from "./controllers/meal-controller";

export const router = Router();

const userController = new UserController();
const mealController = new MealController();
const authController = new AuthController();

router.post("/auth/login", authController.login);
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("/");
  res.send("Logged in!");
});
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.post("/user", userController.create);
router.get(
  "/user/metrics",
  passport.authenticate("jwt"),
  userController.metrics
);
router.get("/user/:id", passport.authenticate("jwt"), userController.find);
router.put("/user/:id", passport.authenticate("jwt"), userController.update);
router.delete("/user/:id", passport.authenticate("jwt"), userController.delete);

router.post("/meal", passport.authenticate("jwt"), mealController.create);
router.get("/meal/:id", passport.authenticate("jwt"), mealController.find);
router.get("/meals", passport.authenticate("jwt"), mealController.listByUser);
router.put("/meal/:id", passport.authenticate("jwt"), mealController.update);
router.delete("/meal/:id", passport.authenticate("jwt"), mealController.delete);
