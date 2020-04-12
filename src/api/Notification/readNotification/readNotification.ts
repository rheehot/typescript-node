import { PrismaClient, User } from "@prisma/client";
import { _Context } from "../../../interface";
const prisma = new PrismaClient();

export default {
  Mutation: {
    readNotification: async (
      _: any,
      __: any,
      { request, isLogin }: _Context
    ) => {
      isLogin(request);
      const { id: requestId } = request.user as User;
      await prisma.notification.deleteMany({
        where: { userId: requestId },
      });
      return true;
    },
  },
};
