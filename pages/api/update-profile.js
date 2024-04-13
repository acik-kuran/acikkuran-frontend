import request, { gql } from "graphql-request";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";

import { authOptions } from "@auth/[...nextauth]";

const secret = process.env.NEXTAUTH_SECRET;
export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const { name, birthdate, location } = JSON.parse(req.body);
    const token = await getToken({
      req,
      secret,
      raw: true,
    });
    if (token) {
      const mutation = gql`
        mutation updateUserMutation(
          $id: uuid!
          $name: String!
          $birthdate: date
          $location: String
        ) {
          update_users_by_pk(
            pk_columns: { id: $id }
            _set: { name: $name, birthdate: $birthdate, location: $location }
          ) {
            settings
          }
        }
      `;

      const data = await request(
        process.env.HASURA_API_ENDPOINT,
        mutation,
        { id: session.user?.id, name, birthdate, location },
        { authorization: `Bearer ${token}` }
      );
      res.send(data);
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
