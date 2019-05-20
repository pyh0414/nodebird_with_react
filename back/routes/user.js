const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const db = require("../models");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const exUser = await db.User.findOne({
      where: {
        userId: req.body.id
      }
    });
    if (exUser) {
      return res.send("이미 사용중인 아이디 입니다");
    }
    const hashedPassword = await brcypt.hash(req.body.password, 12);
    const newUSer = await db.User.create({
        nickname : req.body.nickname,
        userId = req.body.userId,
        passwrod : req.body.password
    })
    return res.json(newUSer);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
