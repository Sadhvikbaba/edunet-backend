import { Router } from "express";

const router = Router();
import { applyForPost, createPost ,getPosts} from "../controllers/post.controller.js";
import { authenticateToken} from "../middlewares/auth.middleware.js";

router.route("/create-post").post(authenticateToken, createPost);
router.route("/get-posts").get(authenticateToken, getPosts);
router.route("/apply/:postId").post(authenticateToken, applyForPost);

export default router;