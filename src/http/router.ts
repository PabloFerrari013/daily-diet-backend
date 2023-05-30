import { UserController } from "./controllers/user-controller";
import { Router } from "express";

export const router = Router();

const userController = new UserController();

router.post("/user", userController.create);
router.get("/user/:id", userController.find);
router.put("/user/:id", userController.update);
router.delete("/user/:id", userController.delete);
