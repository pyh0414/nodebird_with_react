import React from "react";

const Hashtag = () => {
  return <div>hashtag</div>;
};

Hashtag.getInitialProps = async context => {
  // context : __app.js에서 ctx가 넘어온 것
  // getInitialProps : next에서 제공해줌
  console.log(context.query.tag);
};
export default Hashtag;
