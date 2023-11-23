import React from "react";
import Background from "../components/Background";
import "../styles/_globals.css";
import "../styles/fontawesome-all.css";
import { Lato } from "next/font/google"

const lato = Lato({ weight: ["100", "300", "400", "700"], subsets: ["latin"], style: ["normal", "italic"] });

interface AppProps {
  Component: any;
  pageProps: any;
}

const App = (props: AppProps) => {
  const { Component, pageProps } = props;
  return (
    <>
      <Background />
      <main className={lato.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default App;
