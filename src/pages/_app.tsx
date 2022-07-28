import type { AppProps } from "next/app";
import { Layout } from "../components";
import Head from "next/head";
import { StateContextProvider } from "../context/StateContext";

import "../styles/globals.scss";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StateContextProvider>
      <Layout>
        <Head>
          <title>Phanox</title>
        </Head>

        <Toaster position="top-center" reverseOrder={false} />

        <Component {...pageProps} />
      </Layout>
    </StateContextProvider>
  );
}

export default MyApp;
