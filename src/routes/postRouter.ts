import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema";
import { validateToken } from "../middlewares/validateToken";
import postsController from "../controllers/postsController";
import { postSchema } from "../schemas/postSchema";

const postRouter = Router();

postRouter.use(validateToken);
postRouter.get("/followed", postsController.getPostsFromFollowed);
postRouter.get("/:id?", postsController.getPosts);
postRouter.post("/", validateSchema(postSchema), postsController.createPost);

export default postRouter;
