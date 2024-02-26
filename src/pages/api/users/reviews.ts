import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { withApiSession } from "@/libs/server/withSession";

declare module "iron-session" {
  interface IronSessionData {
    user?: { id: number };
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
): Promise<any> {
  const {
    session: { user },
  } = req;

  const reviews = await client.review.findMany({
    where: { CreatedFor: { id: user?.id } },
    include: { CreatedBy: { select: { id: true, name: true, avatar: true } } },
  });

  return res.status(200).json({ ok: true, reviews });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
