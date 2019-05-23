const passport = require("passport");
const db = require("../models");
const local = require("./local");

module.exports = () => {
  passport.serializeUser((user, done) => {
    // 로그인때 실행
    // 서버쪽에 [{ id: 3, cookie: 'asdfgh' }]
    return done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    // 매 요청하다 실행
    try {
      const user = await db.User.findOne({
        where: { id }
      });
      return done(null, user); // req.user에 저장됨
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });

  local();
};

// 프론트에서 서버로는 cookie만 보내요(asdfgh)
// 서버에는 {id:3 , cookie:'asdfgh'}가 있음, 여기서 쿠키로 id를 찾아서 디비에 id에 해당하는 유저를 찾아옴
// 서버가 쿠키파서, 익스프레스 세션으로 쿠키 검사 후 id: 3 발견
// id: 3이 deserializeUser에 들어감
// req.user로 사용자 정보가 들어감

// 요청 보낼때마다 deserializeUser가 실행됨(db 요청 1번씩 실행)
// 실무에서는 deserializeUser 결과물 캐싱
