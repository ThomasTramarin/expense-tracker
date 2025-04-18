import express, { Request, Response } from "express";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import { errorHandler } from "./middlewares/errorHandler";
import { ApiError } from "./utils/ApiError";
import { logger } from "./config/logger";
import { morganMiddleware } from "./middlewares/morganMiddleware";

dotenv.config();

const app = express();
app.use(morganMiddleware());

app.use(express.json());

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello World" });
  })
);

app.use(errorHandler);

app.listen(4000, () => {
  logger.info("Server is running on port 4000");
});
