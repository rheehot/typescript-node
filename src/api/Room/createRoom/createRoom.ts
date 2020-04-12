import { PrismaClient, User } from "@prisma/client";
import { _Context } from "../../../interface";
const prisma = new PrismaClient();

type _Args = {
  title: string;
  info: string;
  contactURL: string;
};

export default {
  Mutation: {
    createRoom: async (
      _: any,
      { title, info, contactURL }: _Args,
      { request, isLogin }: _Context
    ) => {
      isLogin(request);
      const { id: requestId } = request.user as User;
      await prisma.room.create({
        data: {
          manager: { connect: { id: requestId } },
          title,
          info,
          contactURL,
        },
      });
      return true;
    },
  },
};
