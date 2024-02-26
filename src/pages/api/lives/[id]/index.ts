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
    query: { id },
    session: { user },
  } = req;
  if (!id) return res.status(400).json({ ok: false });
  // const live = await client.stream.findUnique({
  //   where: { id: +id.toString() },
  //   select: {
  //     id: true,
  //     createdAt: true,
  //     updatedAt: true,
  //     userId: true,
  //     name: true,
  //     description: true,
  //     price: true,
  //     streamId: true,

  //     Messages: {
  //       include: { user: { select: { name: true, avatar: true, id: true } } },
  //     },
  //   },
  // });

  const live = await client.stream.findUnique({
    where: { id: +id.toString() },
    include: {
      Messages: {
        include: { user: { select: { name: true, avatar: true, id: true } } },
      },
    },
  });

  let isOwner;
  if (live && user?.id !== live.userId) {
    live.streamKey = null;
    live.streamUrl = null;
    isOwner = false;
  } else if (live && user?.id == live.userId) {
    isOwner = true;
  }

  if (!live)
    return res.status(404).json({
      ok: false,
      error: { message: "요청한 데이터를 찾을 수 없습니다." },
    });

  return res.status(200).json({ ok: true, live, isOwner });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
