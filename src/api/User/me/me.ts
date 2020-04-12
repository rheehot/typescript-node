import { PrismaClient, User } from "@prisma/client";
import { _Context } from "../../../interface";
const prisma = new PrismaClient();

export default {
  Query: {
    me: (_: any, __: any, { request, isLogin }: _Context) => {
      isLogin(request);
      const { id } = request.user as User;
      return prisma.user.findOne({ where: { id } });
    },
  },
};
