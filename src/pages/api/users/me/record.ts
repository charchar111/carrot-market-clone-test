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
    query: { kind },
  } = req;
  const kindString = kind?.toString().toUpperCase();

  if (
    kindString != "FAVORITE" &&
    kindString != "PURCHASE" &&
    kindString !== "SALE"
  )
    return res.status(400).json({ ok: false });

  const records = await client.record.findMany({
    where: { userId: user?.id, kind: kindString },
    include: {
      product: {
        include: {
          _count: { select: { Records: { where: { kind: "FAVORITE" } } } },
        },
      },
    },
  });

  return res.status(200).json({ ok: true, records });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
