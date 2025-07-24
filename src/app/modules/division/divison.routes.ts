import { Router } from "express";
import { divisionController } from "./divison.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createDivisionSchema,
  updateDivisionSchema,
} from "./divison.validation";

const router = Router();

router.post(
  "/create",
  checkAuth(Role.ADMIN, Role.SUPERADMIN),
  validateRequest(createDivisionSchema),
  divisionController.createDivision
);
router.get("/", divisionController.getAllDivisions);
router.get("/:slug", divisionController.getSingleDivision);
router.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPERADMIN),
  validateRequest(updateDivisionSchema),
  divisionController.updateDivision
);
router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPERADMIN),
  divisionController.deleteDivision
);

export const DivisionRoutes = router;
