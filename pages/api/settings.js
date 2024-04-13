import request, { gql } from "graphql-request";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";

import { authOptions } from "@auth/[...nextauth]";

const secret = process.env.NEXTAUTH_SECRET;
export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  const locale = process.env.NEXT_PUBLIC_LOCALE;

  if (session) {
    const { key, newValue } = JSON.parse(req.body);
    let settings;
    const token = await getToken({
      req,
      secret,
      raw: true,
    });
    if (token) {
      const query = gql`
        query userQuery($id: uuid!) {
          users_by_pk(id: $id) {
            settings
          }
        }
      `;

      const mutation = gql`
        mutation updateUserMutation($id: uuid!, $settings: jsonb!) {
          update_users_by_pk(
            pk_columns: { id: $id }
            _set: { settings: $settings }
          ) {
            settings
          }
        }
      `;

      const getSettings = await request(
        process.env.HASURA_API_ENDPOINT,
        query,
        { id: session.user?.id },
        { authorization: `Bearer ${token}` }
      );

      const getSettingsData = getSettings.users_by_pk.settings;
      if (key === "a" && locale === "en") {
        // hack for author_en :( - backwards compatibility
        settings = {
          ...getSettingsData,
          a_en: newValue,
        };
      } else {
        settings = {
          ...getSettingsData,
          [key]: newValue,
        };
      }

      const data = await request(
        process.env.HASURA_API_ENDPOINT,
        mutation,
        {
          id: session.user?.id,
          settings,
        },
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
