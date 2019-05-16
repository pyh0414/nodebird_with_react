import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LOG_IN, LOG_OUT, loginAction, logoutAction } from "../reducers/user";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector(state => state.user); // user가 변경되면 Home컴포넌트도 re-rendering되기 떄문에, 최대한 나눠줘야함
  const { mainPosts } = useSelector(state => state.post);

  useEffect(() => {
    dispatch(loginAction);
  }, []); // 배열에 아무것도 안넣으면 componentDidMout와 같다

  return (
    <div>
      {user ? (
        <div>로그인 했습니다 : {user.nickname}</div>
      ) : (
        <div>로그아웃 했습니다 </div>
      )}
      {isLoggedIn && <PostForm />}
      {mainPosts.map(c => {
        return <PostCard key={c} post={c} />;
      })}
    </div>
  );
};

export default Home;
