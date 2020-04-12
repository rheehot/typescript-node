import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  Query: {
    rooms: () => prisma.room.findMany(),
  },
};
