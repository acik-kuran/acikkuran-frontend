// This file needs to be a cron job to collect daily scores from Redis and insert them into the database.

import dayjs from "dayjs";
import { GraphQLClient, gql } from "graphql-request";
import Redis from "ioredis";

let redis = new Redis(process.env.REDIS_URL);

export default async (req, res) => {
  const date = await dayjs(
    req.query.date ||
      new Date().toLocaleString("en-US", { timeZone: "Europe/Istanbul" })
  ).format("YYYY-MM-DD HH:mm:ss");
  const nowDay = await dayjs(
    req.query.date ||
      new Date().toLocaleString("en-US", { timeZone: "Europe/Istanbul" })
  )
    .add(req.query.date ? 0 : -1, "day")
    .format("YYYY-MM-DD");

  const data = await redis.zrangebyscore(
    `scores:${nowDay}`,
    "-inf",
    "+inf",
    "WITHSCORES"
  );

  const zrangebyscoreParser = (data) => {
    const parsedData = [];
    for (let i = 0; i < data.length; i += 2) {
      parsedData.push({ id: data[i], score: data[i + 1] });
    }
    return parsedData;
  };

  const result = { date, nowDay, scores: zrangebyscoreParser(data) };

  const mutationObject = [];
  result.scores.forEach((item) => {
    item.score = parseInt(item.score);
    const { id, score } = item;

    mutationObject.push({
      user_id: id,
      scores: score,
      target_scores: 960,
      date: nowDay,
    });
  });

  const insertUserScores = gql`
    mutation insertUserScores($objects: [users_scores_insert_input!]!) {
      insert_users_scores(objects: $objects) {
        affected_rows
      }
    }
  `;

  const graphQLClient = new GraphQLClient(process.env.HASURA_API_ENDPOINT, {
    headers: {
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
  });

  graphQLClient.request(insertUserScores, {
    objects: mutationObject,
  });

  res.status(200).json(result);
  res.end();
};
