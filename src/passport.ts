require("dotenv").config();
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Request, Response, NextFunction } from "express";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type _Profile = {
  _json: { email: string; name: string; avatar_url: string };
};

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const verifyUser = async (payload: { id: number }, done: Function) => {
  try {
    const user = await prisma.user.findOne({ where: { id: payload.id } });
    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (e) {
    return done(e, false);
  }
};

export const authenticateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);

passport.use(new Strategy(options, verifyUser));

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      callbackURL: "http://localhost:4000/auth/github/callback",
    },
    async (_: any, __: any, profile: _Profile, cb: Function) => {
      const {
        _json: { email, name: username, avatar_url: imageUrl },
      } = profile;
      try {
        const user = await prisma.user.findOne({ where: { email } });
        if (user) {
          const updatedUser = await prisma.user.update({
            where: { email },
            data: { username, imageUrl },
          });
          return cb(null, updatedUser);
        }
        const newUser = await prisma.user.create({
          data: { email, username, imageUrl },
        });
        return cb(null, newUser);
      } catch (e) {
        return cb(e, false);
      }
    }
  )
);

export const githubAuth = passport.authenticate("github", {
  session: false,
  scope: ["user:email"],
});
