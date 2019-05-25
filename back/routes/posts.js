const express = require("express");
const router = express.Router();

const db = require("../models");

router.get("/", async (req, res) => {
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.User, // 포스트를 가져올 때, 관련된 유저정보도 가져온다
          attributes: ["id", "nickname"], // 가져올 때 어떤 데이터를 가져올 지 결정할 수 있음
          order: [[("createAt", "desc"), "updateAt", "asc"]] // 앞에꺼가 1순위 뒤에꺼가 2순위
        }
      ]
    });
    res.json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
module.exports = router;
