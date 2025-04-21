import { Router } from "express";
import { registerController } from "./auth.controller";
import { validateBody } from "../../middlewares/validateBody";
import { registerSchema } from "./auth.validation";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), registerController);

export default authRouter;
