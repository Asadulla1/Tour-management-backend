import { userController } from "./user.controller";
import { createZodUserSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { Router } from "express";

const router = Router();

router.post(
  "/register",
  validateRequest(createZodUserSchema),
  userController.createUser
);
router.get("/all-users", userController.getAllUsers);

export const userRoutes = router;
