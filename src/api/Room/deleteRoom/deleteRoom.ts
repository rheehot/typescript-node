import { PrismaClient } from "@prisma/client";
import { _Context } from "../../../interface";
const prisma = new PrismaClient();

type _Args = {
  roomId: number;
};

export default {
  Mutation: {
    deleteRoom: async (
      _: any,
      { roomId }: _Args,
      { request, isLogin, isMe }: _Context
    ) => {
      isLogin(request);
      const manager = await prisma.room
        .findOne({ where: { id: roomId } })
        .manager();
      isMe(request, manager);
      await prisma.pending.deleteMany({ where: { roomId } });
      await prisma.participant.deleteMany({ where: { roomId } });
      await prisma.room.delete({ where: { id: roomId } });
      return true;
    },
  },
};
