import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
): Promise<any> {
  const {
    query: { id },
    session: { user },
    body: { answer },
  } = req;
  if (!id || !answer) return res.status(401).json({ ok: false });

  const post = await client.post.findUnique({ where: { id: +id.toString() } });
  if (!post) return res.status(404).json({ ok: false });

  await client.answer.create({
    data: { content: answer, userId: user?.id!, postId: +id.toString() },
  });

  return res.status(200).json({ ok: true });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
