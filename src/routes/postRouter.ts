import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema";
import { validateToken } from "../middlewares/validateToken";
import postsController from "../controllers/postsController";
import { postSchema } from "../schemas/postSchema";

const postRouter = Router();

postRouter.use(validateToken);
postRouter.get("/", postsController.getAllPosts);
postRouter.get("/:id", postsController.getUserPosts);
postRouter.post("/", validateSchema(postSchema), postsController.createPost);

export default postRouter;
