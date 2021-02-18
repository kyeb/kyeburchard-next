import React from "react";
import "../styles/_globals.css";
import "../styles/fontawesome-all.css";

interface AppProps {
  Component: any;
  pageProps: any;
}

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props;
  return <Component {...pageProps} />;
};

export default MyApp;
