const express = require("express");
const db = require("../models");
const router = express.Router();

router.get("/:tag", async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.Hashtag,
          where: {
            name: decodeURIComponent(req.params.tag)
            // 한글, 특수문제 이런 얘들은 주소를 통해서 서버로 갈때는 URIComponent로 바뀌기 때문에
            // 받을때 다시 해독해주어야함
          }
        },
        { model: db.User, attributes: ["id", "nickname"] }
      ]
    });

    res.json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
module.exports = router;
