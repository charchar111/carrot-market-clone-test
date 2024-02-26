import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { withApiSession } from "@/libs/server/withSession";
import { ITEM_PER_PAGE } from "@/libs/constant";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
): Promise<any> {
  if (req.method === "GET") {
    const page = req.query.page;
    if (!page || isNaN(Number(page)) || +page < 1 || +page % 1 !== 0)
      return res.status(400).json({ ok: false });

    const countTotalProduct = await client.product.count({});
    const products = await client.product.findMany({
      include: {
        _count: { select: { Records: { where: { kind: "FAVORITE" } } } },
      },

      take: ITEM_PER_PAGE,
      skip: (+page.toString() - 1) * ITEM_PER_PAGE,
      orderBy: { id: "desc" },
    });

    return res.status(200).json({ ok: true, products, countTotalProduct });
  }

  if (req.method === "POST") {
    const {
      body: { price, description, name, image },
      session: { user },
    } = req;

    console.log("image", image);

    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        user: { connect: { id: user?.id } },
        image: image || "",
      },
    });

    return res.status(201).json({ ok: true, product });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler }),
);
