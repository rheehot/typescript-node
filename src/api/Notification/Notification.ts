import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type _Root = {
  userId: number;
};

export default {
  Notification: {
    user: ({ userId }: _Root) => prisma.user.findOne({ where: { id: userId } }),
  },
};
