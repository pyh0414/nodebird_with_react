import React from "react";
import Link from "next/link";
import Head from "next/head";

import AppLayout from "../components/AppLayout";

const Home = () => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.6/antd.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.6/antd.min.js" />
      </Head>
      <AppLayout />
    </>
  );
};

export default Home;
