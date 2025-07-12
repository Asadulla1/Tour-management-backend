import { validateRequest } from "./../../middlewares/validateRequest";
import { userController } from "./user.controller";
import { createZodUserSchema, updateUserZodSchema } from "./user.validation";
import { Router } from "express";
import { Role } from "./user.interface";
import { checkAuth } from "../../middlewares/checkAuth";
const router = Router();

router.post(
  "/register",
  validateRequest(createZodUserSchema),
  userController.createUser
);
router.get(
  "/all-users",
  checkAuth(Role.ADMIN, Role.SUPERADMIN),
  userController.getAllUsers
);
router.patch(
  "/:id",
  validateRequest(updateUserZodSchema),
  checkAuth(...Object.values(Role)),
  userController.updateUser
);
export const userRoutes = router;
