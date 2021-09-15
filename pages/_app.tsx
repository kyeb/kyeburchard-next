import React from "react";
import Background from "../components/Background";
import "../styles/_globals.css";
import "../styles/fontawesome-all.css";

interface AppProps {
  Component: any;
  pageProps: any;
}

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props;
  return (
    <>
      {process.env.NODE_ENV === "production" && (
        <script
          async
          defer
          data-website-id="98d3a99c-b1bc-49ee-93b6-b825deb1ee0d"
          src="https://umami.kyeburchard.com/umami.js"
        ></script>
      )}
      <Background />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
