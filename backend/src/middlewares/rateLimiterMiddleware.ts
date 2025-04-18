import { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";

const isProd = process.env.NODE_ENV === "production";

export const rateLimiter = isProd
  ? rateLimit({
      max: 100,
      windowMs: 15 * 60 * 1000, // 15 minutes
      standardHeaders: true,
      legacyHeaders: false,
      message: {
        statusCode: 429,
        message: "Too many requests, please try again later",
        success: false,
      },
    })
  : (req: Request, res: Response, next: NextFunction) => next();

export const loginLimiter = isProd
  ? rateLimit({
      max: 5,
      windowMs: 15 * 60 * 1000, // 15 minutes
      standardHeaders: true,
      legacyHeaders: false,
      message: {
        statusCode: 429,
        message: "Too many requests, please try again later",
        success: false,
      },
    })
  : (req: Request, res: Response, next: NextFunction) => next();
