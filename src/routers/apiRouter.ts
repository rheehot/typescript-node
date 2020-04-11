import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const apiRouter = express.Router();

apiRouter.get("/", (_, res): Response => res.send("api"));

export default apiRouter;
