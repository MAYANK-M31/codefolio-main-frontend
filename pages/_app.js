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

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
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
  );
}

export default MyApp;
