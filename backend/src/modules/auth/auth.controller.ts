import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { registerUser } from "./auth.service";
import { logger } from "../../config/logger";

const registerController = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  const user = await registerUser({ name, email, password });

  logger.info(`User registered, email: ${email}`);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

export { registerController };
