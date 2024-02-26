import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { withApiSession } from "@/libs/server/withSession";

interface IUpdateData {
  name?: string;
  email?: string | null;
  phone?: string | null;
  avatar?: string;
}

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
      body: { email, phone, name, avatarId },
      session: { user },
    } = req;
    let updateData: IUpdateData = {};
    // update 쿼리를 위한 객체

    console.log("profile edit", email, phone, name);

    const currentUser = await client.user.findUnique({
      where: { id: user?.id },
    });
    // 세션 정보로 내 유저 정보 확인

    console.log("avatarId", avatarId, typeof avatarId);

    if (
      avatarId &&
      typeof avatarId == "string" &&
      avatarId !== currentUser?.avatar
    ) {
      updateData.avatar = avatarId;
    }

    if (
      name &&
      typeof name == "string" &&
      name.trim() &&
      name !== currentUser?.name
    ) {
      updateData.name = name;
    }

    if (!(email || phone))
      return res.status(400).json({
        ok: false,
        error: {
          message: "휴대폰번호와 이메일 중 하나는 반드시 입력해야 합니다.",
        },
      });

    if (!email) {
      updateData.email = null;
    } else if (
      typeof email == "string" &&
      email.trim() &&
      email !== currentUser?.email
    ) {
      const existEmail = Boolean(
        await client.user.findUnique({
          where: { email },
          select: { id: true },
        }),
      );

      if (existEmail) {
        return res.status(400).json({
          ok: false,
          error: { message: "이미 존재하는 이메일입니다." },
        });
      } else {
        updateData.email = email;
      }
    }

    if (!phone) {
      updateData.phone = null;
    } else if (
      typeof phone == "string" &&
      phone.trim() &&
      phone !== currentUser?.phone &&
      !isNaN(Number(phone))
    ) {
      const existPhone = Boolean(
        await client.user.findUnique({
          where: { phone },
          select: { id: true },
        }),
      );

      if (existPhone) {
        return res.status(400).json({
          ok: false,
          error: { message: "이미 존재하는 휴대폰 번호입니다." },
        });
      } else {
        updateData.phone = phone;
      }
    }
    console.log(updateData);
    if (Object.keys(updateData).length >= 1) {
      console.log("update");
      await client.user.update({ where: { id: user?.id }, data: updateData });
    }
    return res.status(200).json({ ok: true });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler }),
);
