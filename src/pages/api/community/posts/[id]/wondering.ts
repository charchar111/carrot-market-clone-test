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
  } = req;
  if (!id) return res.status(401).json({ ok: false });
  const aleadyExist = await client.wondering.findFirst({
    where: { postId: +id.toString(), userId: user?.id },
    select: { id: true },
  });

  if (aleadyExist) {
    await client.wondering.delete({ where: { id: aleadyExist.id } });
  } else {
    await client.wondering.create({
      data: { postId: +id.toString(), userId: user?.id! },
    });
  }
  return res.status(200).json({ ok: true });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
