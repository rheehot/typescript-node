require("dotenv").config();
import { GraphQLServer, Options } from "graphql-yoga";
import logger from "morgan";

import schema from "./schema";
import { authenticateJwt, githubAuth } from "./passport";
import { isLogin, isMe, returnToken } from "./util";

const PORT = process.env.PORT || 4000;
const options: Options =
  process.env.NODE_ENV === "prod"
    ? {
        port: PORT,
        cors: { origin: ["production_front_URL"] },
        playground: false,
      }
    : { port: PORT };

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isLogin, isMe }),
});

server.express.use(
  logger(process.env.NODE_ENV === "prod" ? "combined" : "dev")
);
server.express.use(authenticateJwt);

server.express.get("/auth/github", githubAuth);
server.express.get("/auth/github/callback", githubAuth, returnToken);

server.start(options, () => console.log(`http://localhost:${PORT}`));
