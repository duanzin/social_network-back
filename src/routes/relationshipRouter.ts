import { Router } from "express";
import { validateToken } from "../middlewares/validateToken";
import { validateSchema } from "../middlewares/validateSchema";
import relationshipController from "../controllers/relationshipController";
import { userIdSchema } from "../schemas/relationshipSchema";

const relationshipRouter = Router();

relationshipRouter.use(validateToken);
relationshipRouter.post(
  "/",
  validateSchema(userIdSchema),
  relationshipController.handleRelationship
);
relationshipRouter.get("/:id", relationshipController.getRelationship);

export default relationshipRouter;
