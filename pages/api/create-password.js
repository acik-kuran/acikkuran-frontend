import axios from "axios";
import bcrypt from "bcrypt";
import * as FormData from "form-data";
import { GraphQLClient, gql } from "graphql-request";
import localesConfig from "locales.config";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
  url: "https://api.eu.mailgun.net",
});

function generateRandomNumericPassword(length) {
  const charset = "123456789";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

const verifyRecaptcha = async (token) => {
  const secretKey = process.env.RECAPTHA_SECRET_KEY;

  var verificationUrl =
    "https://www.google.com/recaptcha/api/siteverify?secret=" +
    secretKey +
    "&response=" +
    token;

  return await axios.post(verificationUrl);
};

export default async (req, res) => {
  let { email, token } = JSON.parse(req.body);
  email = email.trim();

  const tokenResponse = await verifyRecaptcha(token);
  const locale = process.env.NEXT_PUBLIC_LOCALE;

  if (email && tokenResponse.status == 200) {
    // Signed in
    const insertUserMutation = gql`
      mutation insertUserMutation($email: String!, $password: String!) {
        insert_users_auth_requests_one(
          object: { email: $email, password: $password }
          on_conflict: {
            constraint: users_auth_requests_email_key
            update_columns: [password]
          }
        ) {
          email
          password
        }
      }
    `;

    const createdPassword = generateRandomNumericPassword(4);
    const password = await bcrypt.hash(createdPassword, 10);

    const graphQLClient = new GraphQLClient(process.env.HASURA_API_ENDPOINT, {
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
      },
    });

    const emailParams = localesConfig.find(
      (i) => i.locale === locale
    ).createPasswordEmailParams;

    await graphQLClient
      .request(insertUserMutation, { email, password })
      .then(async (data) => {
        if (data?.insert_users_auth_requests_one?.email) {
          await mg.messages
            .create("selam.acikkuran.com", {
              from: `${emailParams.from} <selam@acikkuran.com>`,
              to: [email],
              subject: emailParams.subject,
              template: "create password with params",
              "h:X-Mailgun-Variables": JSON.stringify({
                ...emailParams,
                password: createdPassword,
              }),
            })
            .then((msg) => {
              if (msg.status) {
                res.send({ success: true });
              }
            }) // logs response data
            .catch((err) => {
              console.error("err", err);
              res.status(401);
            }); // logs any error
        } else {
          res.status(401);
        }
      })
      .catch(() => {
        res.status(401);
      });
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
};
