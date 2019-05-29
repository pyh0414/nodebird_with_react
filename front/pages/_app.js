import React from "react";
import Head from "next/head";
import PropsTypes from "prop-types";
import withRedux from "next-redux-wrapper";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import withReduxSaga from "next-redux-saga";
import createSagaMiddleware from "redux-saga";
import axios from "axios";

import { LOAD_USER_REQUEST } from "../reducers/user";
import reducer from "../reducers";
import AppLayout from "../components/AppLayout";
import rootSaga from "../sagas";

const NodeBird = ({ Component, store, pageProps }) => {
  // compoenent가 index,profile,signup을 모두 포함하고 있음
  return (
    <>
      <Provider store={store}>
        <Head>
          <title>NodeBird</title>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"
          />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js" />
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
        </Head>
        <AppLayout>
          <Component {...pageProps} />
          {/* hashtag의 props로 전달됨 */}
        </AppLayout>
      </Provider>
    </>
  );
};

NodeBird.PropsTypes = {
  Component: PropsTypes.node.isRequired, // node : jsx에 들어갈 수 있는 모든 것
  store: PropsTypes.object.isRequired,
  pageProps: PropsTypes.object.isRequired
};

NodeBird.getInitialProps = async context => {
  // context는 next에서 내려주는 얘
  const { ctx, Component } = context;
  let pageProps = {};
  const state = ctx.store.getState();
  const cookie = ctx.isServer ? ctx.req.headers.cookie : ""; // ctx.req,ctx.res는 서버환경일때만 있는 객체
  if (ctx.isServer && cookie) {
    // ssr은 서버,프론트에서 둘 다 실행되는데, 만약 서버환경이면 쿠키를 임의로 넣어줌, 클라이언트의 경우는 브라우저가 알아서 넣어주기 때문에 상관없음
    axios.defaults.headers.Cookie = cookie;
  }
  if (!state.user.me) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST
    });
  }

  if (Component.getInitialProps) {
    // hashtag컴포넌트에 getInitialProps이 있으면 실행
    pageProps = (await Component.getInitialProps(ctx)) || {}; // hashtag에서 return 한 값이 pageProps에 들어감:tag
  }

  return { pageProps }; // 다시 NodeBird의 props로 전달
};

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : compose(
          applyMiddleware(...middlewares),
          !options.isServer &&
            window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f
        );
  const store = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export default withRedux(configureStore)(withReduxSaga(NodeBird));
