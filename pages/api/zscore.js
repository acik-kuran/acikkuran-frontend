import Redis from "ioredis";
import dayjs from "dayjs";
let redis = new Redis(process.env.REDIS_URL);

export default async (req, res) => {
  const request = JSON.parse(req.body);
  if (request.session) {
    const nowDay = await dayjs(
      new Date().toLocaleString("en-US", { timeZone: "Europe/Istanbul" })
    ).format("YYYY-MM-DD");

    const score = await redis.zscore(
      `scores:${nowDay}`,
      request.session.user.id
    );
    res.status(200).json({ score });
  } else {
    res.status(401);
  }
  res.end();
};
