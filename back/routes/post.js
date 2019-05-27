const express = require("express");
const multer = require("multer");
const path = require("path");

const db = require("../models");
const { isLoggedIn } = require("./middleware");

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext); // 제로초.png, ext===.png, basename===제로초
      done(null, basename + new Date().valueOf() + ext);
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 }
});

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s]+/g);
    const newPost = await db.Post.create({
      content: req.body.content, // ex) '제로초 파이팅 #구독 #좋아요 눌러주세요'
      UserId: req.user.id
    });
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag =>
          db.Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() }
          })
        )
      );
      await newPost.addHashtags(result.map(r => r[0]));
    }
    // const User = await newPost.getUser();  다른 방법
    // newPost.User = User;
    // res.json(newPost);
    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [
        {
          model: db.User
        }
      ]
    });
    res.json(fullPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/:id/comments", async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!post) {
      return res.status(404).send("게시글이 존재하지 않습니다.");
    }

    const comments = await db.Comment.findAll({
      where: {
        PostId: req.params.id
      },
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"]
        }
      ]
    });
    return res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/:id/comment", isLoggedIn, async (req, res) => {
  try {
    const post = await db.Post.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!post) {
      return res.status(404).send("게시글이 존재하지 않습니다.");
    }
    const newComment = await db.Comment.create({
      PostId: post.id,
      UserId: req.user.id,
      content: req.body.content
    });
    await post.addComment(newComment.id); // sequelize가 associate와 as를 보고 연결해줌
    const comment = await db.Comment.findOne({
      where: {
        id: newComment.id
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"]
        }
      ]
    });
    return res.json(comment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/images", upload.array("image"), (req, res) => {
  res.json(req.files.map(v => v.filename));
});

module.exports = router;
