import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import * as Routes from "./routes";

dotenv.config();
const app = express();

// =========================== MIDDLEWARES START ===========================

app
  .use(
    cors({
      origin: "*",
      credentials: true,
    })
  )
  .use(helmet())
  .use(morgan(process.env.NODE_ENV === "development" ? "dev" : "short"))
  .use(express.urlencoded({ extended: true }))
  .use(express.json());

// =========================== MIDDLEWARES END ===========================

// =========================== ROUTES START ===========================

app.use("/contest", Routes.contestRouter);

// =========================== ROUTES END ===========================

app.listen(process.env.PORT, () => {
  console.log(`Server Listening to Port ${process.env.PORT}`);
});
