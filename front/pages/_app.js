import React from "react";
import Head from "next/head";
import PropsTypes from "prop-types";
import withRedux from "next-redux-wrapper";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "../reducers";
import AppLayout from "../components/AppLayout";
import rootSaga from "../sagas";

const NodeBird = ({ Component, store }) => {
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
        </Head>
        <AppLayout>
          <Component />
        </AppLayout>
      </Provider>
    </>
  );
};

NodeBird.PropsTypes = {
  Component: PropsTypes.node.isRequired, // node : jsx에 들어갈 수 있는 모든 것
  store: PropsTypes.object.isRequired
};

NodeBird.getInitialProps = async context => {
  // context는 next에서 내려주는 얘
  console.log(context);
  const { ctx, Component } = context;
  let pageProps = {};
  if (Component.getInitialProps) {
    // hashtag컴포넌트에 getInitialProps이 있으면 실행
    pageProps = await Component.getInitialProps(ctx); // ctx는 hashtag의 getInitialProps의 cotext로 전달됨
  }
  return { pageProps };
};

export default withRedux((initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware]; // 추가하려는 middleware를 배열에 넣으면됨
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
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
})(NodeBird); // withRedux를 사용해서 nodeBird에 sotre를 넣어주는 부분
