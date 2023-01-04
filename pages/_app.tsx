import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig, SWRConfiguration } from 'swr';
import { fetcher } from '../utils/fetch';

export default function App({ Component, pageProps }: AppProps) {
  const swrConfig: SWRConfiguration = {
    fetcher: fetcher,
    errorRetryInterval: 500,
    errorRetryCount: 1,
  };
  return (
    <SWRConfig value={swrConfig}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}
