import Head from "next/head";
import type { AppProps } from "next/app";
import { usePersistentStorage } from "../src/hooks/usePersistentStorage";

export default function App({ Component, pageProps }: AppProps) {
  usePersistentStorage();

  return (
    <>
      <Head>
        <title>Memory Map</title>
        <meta
          name="description"
          content="see also https://github.com/creaticoding/memory-map"
        />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
