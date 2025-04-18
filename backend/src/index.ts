import express, { Request, Response } from "express";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import { errorHandler } from "./middlewares/errorHandler";
import { ApiError } from "./utils/ApiError";

dotenv.config();

const app = express();

app.use(express.json());

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    throw new ApiError("Something went wrong", 500);
  })
);

app.use(errorHandler);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
