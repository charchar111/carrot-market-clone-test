import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
): Promise<any> {
  const {
    body: { message },
    query: { id },
    session: { user },
  } = req;
  console.log(message);
  if (!id || !message) return res.status(400).json({ ok: false });
  const stream = await client.stream.findUnique({
    where: { id: +id.toString() },
  });

  if (!stream || !user) return res.status(400).json({ ok: false });
  const newMessage = await client.message.create({
    data: { streamId: stream?.id, content: message, userId: user?.id },
  });

  return res.status(200).json({ ok: true, message: newMessage });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
