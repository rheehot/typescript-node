import * as express from "express";
import apiRouter from "./routers/apiRouter";

const app = express();

app.use("/api", apiRouter);

app.listen(4000, (): void => console.log("Good"));
