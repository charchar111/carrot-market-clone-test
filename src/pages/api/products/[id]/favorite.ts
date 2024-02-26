import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";
import { use } from "react";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
): Promise<any> {
  const {
    query: { id },
    session: { user },
  } = req;

  // 개별 유효성 검사  유저 아이디 체크
  if (!id || !user) return res.status(401).json({ ok: false });
  const aleadyExists = await client.record.findFirst({
    where: { kind: "FAVORITE", productId: +id.toString(), userId: user.id },
  });

  if (aleadyExists) {
    await client.record.delete({ where: { id: aleadyExists.id } });
  } else {
    await client.record.create({
      data: {
        kind: "FAVORITE",
        userId: user.id,
        productId: +id.toString(),
      },
    });
  }

  return res.status(200).json({ ok: true });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
