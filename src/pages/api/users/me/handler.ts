import client from "@/libs/server/client";
import { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
): Promise<any> {
  if (req.method === "GET") {
    const profile = await client.user.findUnique({
      where: { id: req.session.user?.id },
    });

    return res.status(200).json({ ok: true, profile });
  }

  if (req.method === "POST") {
    const {
      body: { email, phone, name },
      session: { user },
    } = req;

    console.log("profile edit", email, phone, name);

    const currentUser = await client.user.findUnique({
      where: { id: user?.id },
    });

    if (!phone && email && currentUser?.email !== email) {
      const existEmail = Boolean(
        await client.user.findUnique({
          where: { email },
          select: { id: true },
        }),
      );

      if (existEmail)
        return res.status(400).json({
          ok: false,
          error: { message: "이미 존재하는 이메일입니다." },
        });

      await client.user.update({ where: { id: user?.id }, data: { email } });
      return res.status(200).json({ ok: true });
    }

    if (phone && !email && currentUser?.phone !== phone) {
      const existPhone = Boolean(
        await client.user.findUnique({
          where: { phone },
          select: { id: true },
        }),
      );

      if (existPhone)
        return res.status(400).json({
          ok: false,
          error: { message: "이미 존재하는 폰 번호입니다." },
        });

      await client.user.update({ where: { id: user?.id }, data: { phone } });
      return res.status(200).json({ ok: true });
    }

    return res.status(200).json({ ok: true });
  }
}
