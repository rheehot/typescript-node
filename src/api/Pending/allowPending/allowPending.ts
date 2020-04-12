import { PrismaClient } from "@prisma/client";
import { _Context } from "../../../interface";
const prisma = new PrismaClient();

type _Args = {
  pendingId: number;
};

export default {
  Mutation: {
    allowPending: async (
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
      // * 요청 확인 후 참가자 추가
      const pending = await prisma.pending.findOne({
        where: { id: pendingId },
      });
      const user = await prisma.user.findOne({
        where: { id: pending?.userId },
      });
      const participant = await prisma.participant.create({
        data: {
          user: { connect: { id: user?.id } },
          room: { connect: { id: pending?.roomId } },
        },
      });
      // * 요청 삭제
      await prisma.pending.delete({ where: { id: pendingId } });
      // * 알림 전송
      const room = await prisma.room.findOne({
        where: { id: participant.roomId },
      });
      await prisma.notification.create({
        data: {
          user: { connect: { id: user?.id } },
          text: `'${room?.title}'에 참가 승인 되었습니다.`,
        },
      });
      return true;
    },
  },
};
