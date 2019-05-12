import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import PropsTypes from "prop-types";

const NodeBird = ({ Component }) => {
  return (
    <>
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
    </>
  );
};

NodeBird.PropsTypes = {
  Component: PropsTypes.node // node : jsx에 들어갈 수 있는 모든 것들
};

export default NodeBird;
