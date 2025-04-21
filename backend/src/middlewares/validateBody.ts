import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { normalizeJoiError } from "../utils/joi";
import { ApiError } from "../utils/ApiError";

// Middleware for validating request body (JOI schema)
export const validateBody =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      throw new ApiError("Validation error", 400, normalizeJoiError(error));
    }

    next();
  };
