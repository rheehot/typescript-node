import { PrismaClient, User } from "@prisma/client";
import { _Context } from "../../interface";
const prisma = new PrismaClient();

type _Root = {
  id?: number;
  managerId?: number;
};

export default {
  Room: {
    manager: ({ managerId }: _Root) =>
      prisma.user.findOne({ where: { id: managerId } }),
    participants: ({ id }: _Root) =>
      prisma.participant.findMany({ where: { roomId: id } }),
    pendings: ({ id }: _Root) =>
      prisma.pending.findMany({ where: { roomId: id } }),
    isWaiting: async ({ id }: _Root, _: any, { request }: _Context) => {
      const { id: requestId } = request.user as User;
      const data = await prisma.room.findOne({ where: { id } }).pendings();
      return Boolean(data.find((item) => item.userId === requestId));
    },
    isPending: async ({ id }: _Root, _: any, { request }: _Context) => {
      const { id: requestId } = request.user as User;
      const pendings = await prisma.room.findOne({ where: { id } }).pendings();
      return Boolean(pendings.find((item) => item.userId === requestId));
    },
    isManager: async ({ id }: _Root, _: any, { request }: _Context) => {
      const { id: requestId } = request.user as User;
      const data = await prisma.room.findOne({ where: { id } });
      return data?.managerId === requestId;
    },
  },
};
