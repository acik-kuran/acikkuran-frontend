import dayjs from "dayjs";
import request, { gql } from "graphql-request";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";

import { authOptions } from "@auth/[...nextauth]";

const secret = process.env.NEXTAUTH_SECRET;
export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const token = await getToken({
      req,
      secret,
      raw: true,
    });
    if (token) {
      const query = gql`
        query usersScoresQuery {
          users_scores(order_by: { date: desc }, limit: 30) {
            scores
            date
            target_scores
          }
        }
      `;

      const data = await request(process.env.HASURA_API_ENDPOINT, query, null, {
        authorization: `Bearer ${token}`,
      });

      // list last 30 days, with dayjs, remove today date and reverse array
      const last30Days = Array.from({ length: 30 }, (_, i) =>
        dayjs(
          new Date().toLocaleString("en-US", { timeZone: "Europe/Istanbul" })
        )
          .add(-i, "day")
          .format("YYYY-MM-DD")
      )
        .filter(
          (item) =>
            item !==
            dayjs(
              new Date().toLocaleString("en-US", {
                timeZone: "Europe/Istanbul",
              })
            ).format("YYYY-MM-DD")
        )
        .reverse();

      let totalScores = 0;

      // data has date and scores. fill these scores acording to date, in last30Days array
      const dataWithScores = last30Days.map((item) => {
        const score = data.users_scores.find((score) => score.date === item);
        totalScores += score ? score.scores : 0;
        return {
          x: item,
          y: score ? score.scores : 0,
        };
      });

      res.send({ dataWithScores, totalScores });
    } else {
      res.status(401);
    }
    res.end();
  } else {
    res.status(401);
    res.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
};
