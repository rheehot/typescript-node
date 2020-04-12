import { PrismaClient } from "@prisma/client";
import { _Context } from "../../../interface";
const prisma = new PrismaClient();

type _Args = {
  pendingId: number;
};

export default {
  Mutation: {
    deletePending: async (
      _: any,
      { pendingId }: _Args,
      { request, isLogin, isMe }: _Context
    ) => {
      isLogin(request);
      const user = await prisma.pending
        .findOne({
          where: { id: pendingId },
        })
        .user();
      isMe(request, user);
      await prisma.pending.delete({ where: { id: pendingId } });
      return true;
    },
  },
};
