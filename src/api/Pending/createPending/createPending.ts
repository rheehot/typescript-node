import { PrismaClient, User } from "@prisma/client";
import { _Context } from "../../../interface";
const prisma = new PrismaClient();

type _Args = {
  roomId: number;
};

export default {
  Mutation: {
    createPending: async (
      _: any,
      { roomId }: _Args,
      { request, isLogin }: _Context
    ) => {
      isLogin(request);
      // * 요청 생성
      const { id: requestId, username: requestUsername } = request.user as User;
      await prisma.pending.create({
        data: {
          user: { connect: { id: requestId } },
          room: { connect: { id: roomId } },
        },
      });
      // * 알림 전송
      const room = await prisma.room.findOne({
        where: { id: roomId },
      });
      await prisma.notification.create({
        data: {
          user: { connect: { id: room?.managerId } },
          text: `'${room?.title}'에 ${requestUsername}님이 가입하고 싶어합니다.`,
        },
      });
      return true;
    },
  },
};
