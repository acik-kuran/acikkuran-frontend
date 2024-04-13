import request, { gql } from "graphql-request";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";

import { authOptions } from "@auth/[...nextauth]";

const secret = process.env.NEXTAUTH_SECRET;
export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const author_selections = JSON.parse(req.body);
    const token = await getToken({
      req,
      secret,
      raw: true, // Raw gives the un-decoded JWT
    });
    if (token) {
      const mutation = gql`
        mutation updateUserMutation($id: uuid!, $author_selections: jsonb!) {
          update_users_by_pk(
            pk_columns: { id: $id }
            _set: { author_selections: $author_selections }
          ) {
            author_selections
          }
        }
      `;

      const data = await request(
        process.env.HASURA_API_ENDPOINT,
        mutation,
        { id: session.user?.id, author_selections },
        { authorization: `Bearer ${token}` }
      );
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
