import "../styles/globals.css";
// pages/_app.js
import { Inter } from "@next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

import {
  QueryClient,
  QueryClientProvider,
  ReactQueryDevtools,
} from "react-query";
import { useEffect } from "react";
import { app } from "../Modules/Firebase/firebase";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <>
      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-Q24EP6LGYF"
      />
      <Script strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-Q24EP6LGYF');`}
      </Script>

      <main className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <Component
            className={`${inter.variable} font-sans`}
            className={inter.className}
            {...pageProps}
          />

          {/* <ReactQueryDevtools/> */}
        </QueryClientProvider>
      </main>
    </>
  );
}

export default MyApp;
