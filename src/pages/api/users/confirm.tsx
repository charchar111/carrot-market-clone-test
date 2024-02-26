import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
): Promise<any> {
  console.log("req.session", req.session);
  const { token } = req.body;
  if (!token) return res.status(400).json({ ok: false });
  // const payload = phone ? { phone: +phone } : { email };

  console.log(token);
  const foundToken = await client.token.findUnique({
    where: { payload: token },
    // include: { user: true },
  });

  console.log(foundToken);

  if (!foundToken) return res.status(404).end();
  req.session.user = {
    id: foundToken.userId,
  };
  await req.session.save();
  await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });
  return res.status(200).json({ ok: true });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false }),
);
