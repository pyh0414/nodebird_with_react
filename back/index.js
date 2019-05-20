const express = require("express");

const db = require("./models");
const userAPIRouter = require("./routes/user");
const postAPIRouter = require("./routes/post");
const postsAPIRouter = require("./routes/posts");

const app = express();
db.sequelize.sync();

app.listen(3065, () => {
  console.log("server is running on 8080");
});
