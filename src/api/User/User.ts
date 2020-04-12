import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type _Root = {
  id: number;
};

export default {
  User: {
    rooms: ({ id }: _Root) =>
      prisma.room.findMany({ where: { managerId: id } }),
    joinRooms: async ({ id }: _Root) =>
      prisma.participant.findMany({ where: { userId: id } }),
    pendings: ({ id }: _Root) =>
      prisma.pending.findMany({ where: { userId: id } }),
    notifications: ({ id }: _Root) =>
      prisma.notification.findMany({ where: { userId: id } }),
  },
};
