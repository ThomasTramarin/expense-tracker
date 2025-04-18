import morgan from "morgan";
import { logger } from "../config/logger";
import { NextFunction, Request, Response } from "express";

const stream = {
  write: (message: string) => logger.http(message.trim()),
};

const format = ":method :url :status :res[content-length] - :response-time ms";

export const morganMiddleware = () => {
  if (process.env.NODE_ENV === "production")
    return (req: Request, res: Response, next: NextFunction) => next();

  return morgan(format, { stream });
};
