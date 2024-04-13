import bcrypt from "bcrypt";
import { GraphQLClient, gql } from "graphql-request";
import * as jsonwebtoken from "jsonwebtoken";
import NextAuth from "next-auth";
import { HasuraAdapter } from "next-auth-hasura-adapter";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
    verifyRequest: "/",
    newUser: "/",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        if (email) {
          const findUserByEmail = gql`
            query findUserByEmailQuery($email: String!) {
              users(where: { email: { _eq: $email } }) {
                id
                email
                name
                image
                location
                emailVerified
                created_at
                birthdate
              }
            }
          `;

          const findAuthRequestByEmail = gql`
            query findAuthRequestByEmailQuery($email: String!) {
              users_auth_requests(where: { email: { _eq: $email } }) {
                id
                email
                password
              }
            }
          `;

          const createUser = gql`
            mutation createUserMutation($object: users_insert_input!) {
              insert_users_one(object: $object) {
                id
                email
                name
                image
                location
                emailVerified
                created_at
                birthdate
              }
            }
          `;

          const deleteAuthRequestByEmail = gql`
            mutation deleteAuthRequestByEmailMutation($email: String!) {
              update_users_auth_requests(
                where: { email: { _eq: $email } }
                _set: { password: "" }
              ) {
                affected_rows
              }
            }
          `;

          const graphQLClient = new GraphQLClient(
            process.env.HASURA_API_ENDPOINT,
            {
              headers: {
                "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
              },
            }
          );

          let user = {};

          await graphQLClient
            .request(findAuthRequestByEmail, { email: email.trim() })
            .then(async (s) => {
              const foundAuthRequest = s.users_auth_requests[0];
              if (foundAuthRequest) {
                const users_auth_requests = foundAuthRequest;
                const passwordMatch = await bcrypt.compare(
                  password,
                  users_auth_requests.password
                );

                if (passwordMatch && password && password.trim() !== "") {
                  await graphQLClient
                    .request(findUserByEmail, { email: email.trim() })
                    .then(async (res) => {
                      const foundUser = res.users[0];
                      if (foundUser) {
                        user = foundUser;
                        return user;
                      } else {
                        await graphQLClient
                          .request(createUser, {
                            object: {
                              email: email.trim(),
                              name: email.trim().replace(/^(.*?)@.*$/, "$1"),
                              image:
                                "https://pbs.twimg.com/profile_images/1254903357774483463/Yp9SCGL6_400x400.jpg",
                            },
                          })
                          .then(async (as) => {
                            if (as.insert_users_one) {
                              user = as.insert_users_one;
                              return user;
                            } else {
                              user = null;
                            }
                          });
                      }
                    });
                }
                if (!passwordMatch || !password || password === "") {
                  user = null;
                }
              } else {
                user = null;
              }
            });

          await graphQLClient.request(deleteAuthRequestByEmail, {
            email: email.trim(),
          });

          if (user) {
            return user;
          } else {
            return null;
          }
        }
      },
    }),
  ],
  adapter: HasuraAdapter({
    endpoint: process.env.HASURA_API_ENDPOINT,
    adminSecret: process.env.HASURA_ADMIN_SECRET,
  }),

  secret: process.env.NEXTAUTH_SECRET,

  session: { strategy: "jwt" },
  // Encode and decode your JWT with the HS256 algorithm
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(token, secret, {
        algorithm: "HS256",
      });
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token, secret, {
        algorithms: ["HS256"],
      });
      return decodedToken;
    },
  },

  callbacks: {
    async jwt({ token }) {
      return {
        ...token,
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-default-role": "user",
          "x-hasura-role": "user",
          "x-hasura-user-id": token.sub,
        },
      };
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        const variables = { id: token.sub };

        const userDetail = gql`
          query userDetailQuery($id: uuid!) {
            users_by_pk(id: $id) {
              id
              name
              birthdate
              location
              settings
              author_selections
            }
          }
        `;

        const graphQLClient = new GraphQLClient(
          process.env.HASURA_API_ENDPOINT,
          {
            headers: {
              "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
            },
          }
        );

        const data = await graphQLClient.request(userDetail, variables);
        const { author_selections, settings, birthdate, location, name } =
          data.users_by_pk;
        session.user.id = token.sub;
        session.user.settings = settings;
        session.user.author_selections = author_selections;
        session.user.name = name;
        session.user.birthdate = birthdate;
        session.user.location = location;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
