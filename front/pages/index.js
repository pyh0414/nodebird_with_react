import React, { useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { LOAD_MAIN_POSTS_REQUEST } from "../reducers/post";

const Home = () => {
  const { me } = useSelector(state => state.user); // user가 변경되면 Home컴포넌트도 re-rendering되기 떄문에, 최대한 나눠줘야함
  const { mainPosts, hasMorePost } = useSelector(state => state.post);

  const dispatch = useDispatch();
  const countRef = useRef([]);

  const onScroll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (hasMorePost) {
        const lastId = mainPosts[mainPosts.length - 1].id;
        if (!countRef.current.includes(lastId)) {
          dispatch({
            type: LOAD_MAIN_POSTS_REQUEST,
            lastId
          });
          countRef.current.push(lastId);
        }
      }
    }
  }, [hasMorePost, mainPosts.length]);
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [mainPosts.length]);
  return (
    <div>
      {me && <PostForm />}
      {mainPosts.map(c => {
        return <PostCard key={c} post={c} />;
      })}
    </div>
  );
};

Home.getInitialProps = context => {
  // __app.js에서 넣어준 ctx
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST
  });
};

export default Home;
