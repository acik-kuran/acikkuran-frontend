import request, { gql } from "graphql-request";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";

import { authOptions } from "@auth/[...nextauth]";

const secret = process.env.NEXTAUTH_SECRET;
export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const { action, type, bookmarkItem, bookmarkKey, verseId } = JSON.parse(
      req.body
    );
    const token = await getToken({
      req,
      secret,
      raw: true, // Raw gives the un-decoded JWT
    });

    let mutation;
    if (token) {
      // Signed in
      if (action === "add") {
        mutation = gql`
          mutation insertBookmarkMutation(
            $userId: uuid!
            $type: String!
            $bookmarkItem: jsonb!
            $bookmarkKey: String!
            $verseId: Int
          ) {
            insert_users_bookmarks_one(
              object: {
                verse_id: $verseId
                type: $type
                user_id: $userId
                bookmarkItem: $bookmarkItem
                bookmarkKey: $bookmarkKey
              }
              on_conflict: {
                constraint: users_bookmarks_bookmarkKey_user_id_key
                update_columns: updated_at
              }
            ) {
              id
            }
          }
        `;
      } else if (action === "remove") {
        mutation = gql`
          mutation deleteBookmarkMutation(
            $bookmarkKey: String!
            $userId: uuid!
          ) {
            delete_users_bookmarks(
              where: {
                bookmarkKey: { _eq: $bookmarkKey }
                user_id: { _eq: $userId }
              }
            ) {
              affected_rows
            }
          }
        `;
      }

      let mutationVariables = {
        bookmarkKey,
        userId: session.user?.id,
      };

      if (action === "add") {
        mutationVariables.bookmarkItem = bookmarkItem;
        mutationVariables.type = type;
        mutationVariables.verseId = verseId;
      }

      const data = await request(
        process.env.HASURA_API_ENDPOINT,
        mutation,
        mutationVariables,
        { authorization: `Bearer ${token}` }
      );
      if (data) {
        res.send(data);
      } else {
        res.status(500);
        res.send({ error: "Error while adding/removing bookmark" });
      }
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
