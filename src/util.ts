import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "@prisma/client";

export const isLogin = (req: Request) => {
  if (!req.user) {
    throw Error("로그인이 필요합니다.");
  }
  return;
};

export const isMe = (req: Request, target: { id: number }) => {
  const { id: userId } = req.user as User;
  if (userId !== target.id) {
    throw Error("권한이 없습니다.");
  }
  return;
};

export const generateToken = (id: number) =>
  jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: 60 * 60 * 24 * 3 });

export const returnToken = (req: Request, res: Response) => {
  const { id } = req.user as User;
  const token = generateToken(id);
  console.log(`token = ${token}`);
  // todo 프론트로 redirect
  res.redirect("/");
};
