import dayjs from "dayjs";
import Redis from "ioredis";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@auth/[...nextauth]";

let redis = new Redis(process.env.REDIS_URL);

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (session && req.body) {
    const nowDay = await dayjs(
      new Date().toLocaleString("en-US", { timeZone: "Europe/Istanbul" })
    ).format("YYYY-MM-DD");

    const { sec } = JSON.parse(req.body);
    const count = await redis.zincrby(`scores:${nowDay}`, sec, session.user.id);
    res.status(200).json({ count });
  } else {
    res.status(401);
  }
  res.end();
};
