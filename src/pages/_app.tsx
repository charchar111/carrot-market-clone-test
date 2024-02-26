import useUser from "@/libs/client/useUser";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import useSWR, { SWRConfig } from "swr";

export const globalFetcher = (url: string) =>
  fetch(url).then((res) => res.json());

export default function App({ Component, pageProps }: AppProps) {
  const { user, isLoading } = useUser();

  return (
    <SWRConfig value={{ fetcher: globalFetcher }}>
      <Component {...pageProps} user={{ user, isLoading }} />
    </SWRConfig>
  );
}
