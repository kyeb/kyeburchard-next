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
      <div className="background">
        <Background />
      </div>
      <Component {...pageProps} />{" "}
    </>
  );
};

export default MyApp;
