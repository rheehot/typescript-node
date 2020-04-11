import * as express from "express";
import * as logger from "morgan";
import apiRouter from "./routers/apiRouter";

const app = express();

app.use(logger(process?.env?.NODE_ENV === "production" ? "combined" : "dev"));

app.use("/api", apiRouter);

app.listen(4000, (): void => console.log("Good"));
