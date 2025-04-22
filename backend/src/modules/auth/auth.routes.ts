import { Router } from "express";
import { loginController, registerController } from "./auth.controller";
import { validateBody } from "../../middlewares/validateBody";
import { loginSchema, registerSchema } from "./auth.validation";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), registerController);
authRouter.post("/login", validateBody(loginSchema), loginController);

export default authRouter;
