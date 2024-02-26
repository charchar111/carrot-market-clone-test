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
  const product = await client.product.findUnique({
    where: { id: +id.toString() },
    include: { user: { select: { id: true, name: true, avatar: true } } },
  });

  if (!product)
    return res.status(404).json({
      ok: false,
      error: { message: "요청한 데이터를 찾을 수 없습니다." },
    });

  const terms = product?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));

  let relatedProducts;
  if (terms) {
    relatedProducts = await client.product.findMany({
      where: { OR: terms, AND: { NOT: { id: product?.id } } },
      orderBy: { updatedAt: "desc" },
      take: 4,
    });
  }
  let isLiked;
  if (user && product) {
    isLiked = Boolean(
      await client.record.findFirst({
        where: {
          kind: "FAVORITE",
          productId: product.id,
          userId: user?.id,
        },
        select: { id: true },
      }),
    );
  }

  return res.status(200).json({ ok: true, product, isLiked, relatedProducts });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
