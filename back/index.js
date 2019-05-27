const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const dotenv = require("dotenv");
const passport = require("passport");

const db = require("./models");
const passportConfig = require("./passport");
const userAPIRouter = require("./routes/user");
const postAPIRouter = require("./routes/post");
const postsAPIRouter = require("./routes/posts");
const hashtagAPIRouter = require("./routes/hashtag");

const app = express();
dotenv.config();

app.use("/", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // express.json()과 같이 req.body 데이터를 받을 수 있음
app.use(morgan("dev"));
app.use(
  cors({
    origin: true,
    credentials: true
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키분석
app.use(
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
app.use(passport.initialize());
app.use(passport.session());
// 서버쪽에 세션 두는거, 프론트에 쿠키 보내는거, 매번 누가 로그인했는지 확인하는 것을 모든 라우터에 붙여줘야 하기 때문에 사용

db.sequelize.sync();
passportConfig();

app.use("/api/posts", postsAPIRouter);
app.use("/api/user", userAPIRouter);
app.use("/api/post", postAPIRouter);
app.use("/api/hashtag", hashtagAPIRouter);

app.listen(3065, () => {
  console.log("server is running on 8080");
});
