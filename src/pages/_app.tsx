import type { AppProps } from "next/app";
import { Layout } from "../components";
import Head from "next/head";
import { StateContextProvider } from "../context/StateContext";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StateContextProvider>
      <Layout>
        <Head>
          <title>Phanox</title>
        </Head>

        <Component {...pageProps} />
      </Layout>
    </StateContextProvider>
  );
}

export default MyApp;
