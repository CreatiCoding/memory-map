import Head from "next/head";
import type { AppProps } from "next/app";
import { usePersistentStorage } from "../src/hooks/usePersistentStorage";
import "../src/styles/reset.css";

export default function App({ Component, pageProps }: AppProps) {
  const [enabledPersistentStorage] = usePersistentStorage();

  return (
    <>
      <Head>
        <title>Memory Map</title>
        <meta
          name="description"
          content="see also https://github.com/creaticoding/memory-map"
        />
        <link rel="manifest" href="manifest.json" />
      </Head>

      {enabledPersistentStorage}

      <Component {...pageProps} />
    </>
  );
}
