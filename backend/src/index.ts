import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json({
    msg: "Test message!",
  });
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
