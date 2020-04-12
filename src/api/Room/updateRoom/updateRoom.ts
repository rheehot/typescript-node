import { PrismaClient } from "@prisma/client";
import { _Context } from "../../../interface";
const prisma = new PrismaClient();

type _Args = {
  roomId: number;
  title: string;
  info: string;
  contactURL: string;
  recruiting: boolean;
};

export default {
  Mutation: {
    updateRoom: async (
      _: any,
      { roomId, title, info, contactURL, recruiting }: _Args,
      { request, isLogin, isMe }: _Context
    ) => {
      isLogin(request);
      const manager = await prisma.room
        .findOne({ where: { id: roomId } })
        .manager();
      isMe(request, manager);
      await prisma.room.update({
        where: { id: roomId },
        data: { title, info, contactURL, recruiting },
      });
      return true;
    },
  },
};
