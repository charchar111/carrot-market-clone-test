import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: { id: number };
  }
}

const sessionOption = {
  cookieName: "carrotsession",
  password: process.env.IRON_SESSION_OPTION_PASSWORD!,
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, sessionOption);
}
