import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type _Root = {
  userId: number;
  roomId: number;
};

export default {
  Participant: {
    user: ({ userId }: _Root) => prisma.user.findOne({ where: { id: userId } }),
    room: ({ roomId }: _Root) => prisma.room.findOne({ where: { id: roomId } }),
  },
};
