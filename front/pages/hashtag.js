import React from "react";
import ProtoType from "prop-types";
import { useSelector } from "react-redux";
import { LOAD_HASHTAG_POSTS_REQUEST } from "../reducers/post";
import PostCard from "../components/PostCard";

const Hashtag = () => {
  // _app.js에서 <Component {...pageProps} />의 {...pageProps}부분

  const { mainPosts } = useSelector(state => state.post);

  return (
    <div>
      {mainPosts.map(c => {
        return <PostCard key={+c.createAt} post={c} />;
      })}
    </div>
  );
};

Hashtag.prototype = {
  tag: ProtoType.string.isRequired
};

Hashtag.getInitialProps = async context => {
  const tag = context.query.tag;
  // 처음 next가 실행해주는 부분
  // context : __app.js에서 ctx가 넘어온 것
  // getInitialProps : next에서 제공해줌
  context.store.dispatch({ type: LOAD_HASHTAG_POSTS_REQUEST, data: tag });
  return {
    tag // _app.js컴포넌트에서 wait Component.getInitialProps(ctx)의 값
  };
};
export default Hashtag;
