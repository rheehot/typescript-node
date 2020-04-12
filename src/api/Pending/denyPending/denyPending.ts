import { PrismaClient } from "@prisma/client";
import { _Context } from "../../../interface";
const prisma = new PrismaClient();

type _Args = {
  pendingId: number;
};

export default {
  Mutation: {
    denyPending: async (
      _: any,
      { pendingId }: _Args,
      { request, isLogin, isMe }: _Context
    ) => {
      isLogin(request);
      const manager = await prisma.pending
        .findOne({
          where: { id: pendingId },
        })
        .room()
        .manager();
      isMe(request, manager);
      // * 해당 요청 삭제
      const room = await prisma.pending
        .findOne({
          where: { id: pendingId },
        })
        .room();
      const user = await prisma.pending
        .findOne({ where: { id: pendingId } })
        .user();
      await prisma.pending.delete({ where: { id: pendingId } });
      // * 요청의 user에게 알림 전송
      await prisma.notification.create({
        data: {
          user: { connect: { id: user?.id } },
          text: `'${room?.title}'에 대한 참가 요청이 거부되었습니다.`,
        },
      });
      return true;
    },
  },
};
