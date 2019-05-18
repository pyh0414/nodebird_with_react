import React from "react";
import { useSelector } from "react-redux";

import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
  const { isLoggedIn } = useSelector(state => state.user); // user가 변경되면 Home컴포넌트도 re-rendering되기 떄문에, 최대한 나눠줘야함
  const { mainPosts } = useSelector(state => state.post);

  return (
    <div>
      {isLoggedIn && <PostForm />}
      {mainPosts.map(c => {
        return <PostCard key={c} post={c} />;
      })}
    </div>
  );
};

export default Home;
