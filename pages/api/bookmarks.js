import request, { gql } from "graphql-request";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";

import { authOptions } from "@auth/[...nextauth]";

const secret = process.env.NEXTAUTH_SECRET;
export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  const author = req.query.author || 105;

  if (session) {
    const token = await getToken({
      req,
      secret,
      raw: true,
    });

    if (token) {
      // Signed in
      const query = gql`
        query usersBookmarksQuery {
          users_bookmarks(order_by: { updated_at: desc }) {
            id
            bookmarkKey
            bookmarkItem
            type
            updated_at
            verse {
              page
              surah {
                id
                name
                name_en
              }
              verse_number
              verse
              transcription
              translations(where: { author_id: { _eq: ${author} } }) {
                id
                author_id
                text
              }
            }
          }
        }
      `;

      const data = await request(process.env.HASURA_API_ENDPOINT, query, null, {
        authorization: `Bearer ${token}`,
      });
      res.send(data);
    } else {
      // Not Signed in
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
