import client from "@/libs/server/client";
import smtpTransport from "@/libs/server/email";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

import { Twilio } from "twilio";

const twilioClient = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_TOKEN,
);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const { phone, email } = req.body;

  // let user;
  const payload = Math.floor(Math.random() * 900000 + 100000) + "";
  // 6자리 랜덤 숫자 생성
  // 그런데, 이것도 많아지다 보면 겹치지 않나?

  const user = phone ? { phone: phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  // const payload = phone ? { phone: +phone } : { email };
  // 원래 payload

  // user = await client.user.upsert({
  //   where: {
  //     ...payload,
  //   },
  //   create: {
  //     name: "anon",
  //     ...payload,
  //   },
  //   update: {},
  // });

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "anon",
            ...user,
          },
        },
      },
    },
  });

  // 실제 토큰 발송 api 주석 처리
  // 코스트 낭비 방지용
  if (phone) {
    const message = await twilioClient.messages.create({
      body: `캐럿마켓 클론에서 보낸 인증메시지입니다. 로그인을 위한 토큰입니다. \n ${payload}`,
      to: "+82" + phone, // Text your number
      messagingServiceSid: process.env.TWLIO_MESSAGE_SERVICE_SID,
    });

    console.log(message);
  }

  // 실제 토큰 발송 api 주석 처리
  // 코스트 낭비 방지용
  if (email) {
    console.log("이메일 form 확인, 인증 작업 1단계 시작");
    const emailOption = {
      from: process.env.MAIL_ID,
      to: email,
      subject: "Nomad coder Carrot market clone Authentication Email",
      text: `authentication code: ${payload}`,
    };

    const errorCallback = (error: any, responses: any) => {
      if (error) console.log("email error", error);
      else if (responses) console.log("email responses", responses);
      return;
    };

    const send = await smtpTransport.sendMail(emailOption, errorCallback);
    smtpTransport.close();
    console.log(send);
  }

  console.log(token);
  return res.status(200).json({ ok: true });
  //   if (email)
  //   if (email) {
  //     user = await client.user.findUnique({ where: { email } });
  //     if (!user) {
  //       console.log("유저x , 생성");
  //       user = await client.user.create({ data: { email, name: "Anon" } });
  //     }
  //   }

  //   if (phone) {
  //     if (isNaN(+phone) || +phone <= 0)
  //       throw new Error("휴대폰 번호의 입력 형식이 올바르지 않습니다.");
  //     user = await client.user.findUnique({ where: { phone: +phone } });
  //     if (!user) {
  //       console.log("유저x , 생성");
  //       user = await client.user.create({
  //         data: { phone: +phone, name: "Anon" },
  //       });
  //     }
  //   }

  // console.log(user);
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
