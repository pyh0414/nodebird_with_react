import React from "react";
import ProtoType from "prop-types";

const Hashtag = ({ tag }) => {
  // _app.js에서 <Component {...pageProps} />의 {...pageProps}부분
  return <div>hashtag{tag}</div>;
};

Hashtag.prototype = {
  tag: ProtoType.string.isRequired
};

Hashtag.getInitialProps = async context => {
  // context : __app.js에서 ctx가 넘어온 것
  // getInitialProps : next에서 제공해줌
  return {
    tag: context.query.tag // _app.js컴포넌트에서 wait Component.getInitialProps(ctx)의 값
  };
};
export default Hashtag;
