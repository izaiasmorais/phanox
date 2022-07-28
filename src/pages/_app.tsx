import type { AppProps } from "next/app";
import { Layout } from "../components";
import Head from "next/head";
import { GlobalStyle } from "../styles/globals";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>Phanox</title>
      </Head>

      <Component {...pageProps} />

      <GlobalStyle />
    </Layout>
  );
}

export default MyApp;
