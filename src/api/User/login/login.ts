import { PrismaClient } from "@prisma/client";
import { generateToken } from "../../../util";
const prisma = new PrismaClient();

type _Args = {
  email: string;
};

export default {
  Mutation: {
    login: async (_: any, { email }: _Args) => {
      const user = await prisma.user.findOne({ where: { email } });
      const token = generateToken(Number(user?.id));
      return token;
    },
  },
};
