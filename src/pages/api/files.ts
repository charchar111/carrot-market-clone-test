// 파일 post 요청을 cloudflare에 전송, 보안 url 수신

import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
): Promise<any> {
  // console.log("file");
  // console.log(process.env);
  const requestURL = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN_IMAGE}`,
        },
      },
    )
  ).json();

  console.log(requestURL);
  if (requestURL.success) {
    return res.status(200).json({ ok: true, ...requestURL.result });
  } else {
    return res
      .status(500)
      .json({ ok: false, error: { message: requestURL.errors } });
  }
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
