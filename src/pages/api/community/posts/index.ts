import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";
import { ITEM_PER_PAGE } from "@/libs/constant";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
): Promise<any> {
  if (req.method === "GET") {
    const { latitude, longitude, page } = req.query;
    // console.log(latitude, longitude);
    let posts;
    const dataQuery: any = {};
    let parsedLatitude;
    let parsedLongitude;
    if (latitude && longitude) {
      parsedLatitude = parseFloat(latitude?.toString());
      parsedLongitude = parseFloat(longitude.toString());

      dataQuery.latitude = {
        gte: parsedLatitude - 0.01,
        lte: parsedLatitude + 0.01,
      };
      dataQuery.longitude = {
        gte: parsedLongitude - 0.01,
        lte: parsedLongitude + 0.01,
      };
    }

    posts = await client.post.findMany({
      where: dataQuery,
      orderBy: { id: "asc" },
      take: ITEM_PER_PAGE,
      skip: page == undefined ? 0 : (+page?.toString() - 1) * ITEM_PER_PAGE,
      include: { _count: true, user: { select: { id: true, name: true } } },
    });

    console.log(req.query);

    return res.status(200).json({ ok: true, posts });
  }

  if (req.method === "POST") {
    const {
      body: { title, content, latitude, longitude },
      session: { user },
    } = req;

    if (!title || !content) return res.status(401).json({ ok: false });

    const post = await client.post.create({
      data: {
        title,
        content,
        latitude,
        longitude,
        user: { connect: { id: user?.id } },
      },
    });
    console.log("post", post);

    return res.status(201).json({ ok: true, post: { id: post.id } });
  }
}

export default withApiSession(
  withHandler({ methods: ["POST", "GET"], handler }),
);
