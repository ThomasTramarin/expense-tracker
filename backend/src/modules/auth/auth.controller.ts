import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { loginUser, registerUser } from "./auth.service";
import { logger } from "../../config/logger";

export const registerController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    const user = await registerUser(name, email, password);

    logger.info(`User registered, email: ${email}`);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  }
);

export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await loginUser(email, password);
    logger.info(`User logged in, email: ${email}`);

    res.cookie("token", user.token, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: user,
    });
  }
);
