import { Router } from "express";
import { validateToken } from "../middlewares/validateToken";
import { validateSchema } from "../middlewares/validateSchema";
import relationshipController from "../controllers/relationshipController";
import { followUserIdSchema } from "schemas/relationshipSchema";

const relationshipRouter = Router();

relationshipRouter.use(validateToken);
relationshipRouter.post(
  "/",
  validateSchema(followUserIdSchema),
  relationshipController.handleRelationship
);
relationshipRouter.get("/:id", relationshipController.getRelationship);

export default relationshipRouter;
