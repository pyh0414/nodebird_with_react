const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const next = require("next");
const dotenv = require("dotenv");

const dev = process.env.NODE_DEV !== "development";
const prod = process.env.NODE_DEV === "production";

const app = next({ dev });
const handle = app.getRequestHandler();
dotenv.config();

app.prepare().then(() => {
  const server = express();
  server.use(morgan("dev"));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser(process.env.COOKIE_SECRET));
  server.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true, // 자바스크립트에서 쿠키게 접근 못함
        secure: false // https쓸때 true
      },
      name: "pyh"
    })
  );

  server.get("*", (req, res) => {
    return handle(req, res);
  });
  server.listen(3060, () => {
    console.log("next+expree running on port 3060");
  });
});
