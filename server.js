const express = require("express");
const next = require("next");
// const favicon = require("serve-favicon");

const dev = process.env.NEXT_PUBLIC_ENVIRONMENT !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server
      .use
      // favicon(path.join(__dirname, "public", "static", "favicon.ico"))
      ();

    const serviceWorkers = [
      {
        filename: "firebase-messaging-sw.js",
        path: "./firebase-messaging-sw.js",
      },
    ];

    serviceWorkers.forEach(({ filename, path }) => {
      server.get(`/${filename}`, (req, res) => {
        app.serveStatic(req, res, path);
      });
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(2018, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:2018");
    });
  })
  .catch((ex) => {
    // console.error(ex.stack);
    process.exit(1);
  });
