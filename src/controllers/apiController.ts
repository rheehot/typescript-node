import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const { username } = req?.query;
  const user = await prisma.user.create({
    data: { username: String(username) },
  });
  res.json(user);
};

export const books = async (req: Request, res: Response) => {
  const books = await prisma.book.findMany();
  res.json(books);
};

export const createBook = async (req: Request, res: Response) => {
  const { title, content, userId } = req?.query;
  const book = await prisma.book.create({
    data: {
      user: { connect: { id: Number(userId) } },
      title: String(title),
      content: String(content),
    },
  });
  res.json(book);
};

export const updateBook = async (req: Request, res: Response) => {
  const { title, content, bookId } = req?.query;
  const updateBook = await prisma.book.update({
    where: { id: Number(bookId) },
    data: { title: String(title), content: String(content) },
  });
  res.json(updateBook);
};

export const deleteBook = async (req: Request, res: Response) => {
  const { bookId } = req?.query;
  await prisma.book.delete({ where: { id: Number(bookId) } });
  res.send("deleted");
};
