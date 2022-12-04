import "../styles/globals.css";
import { QueryClient, QueryClientProvider, ReactQueryDevtools } from "react-query";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />

      {/* <ReactQueryDevtools/> */}
    </QueryClientProvider>
  );
}

export default MyApp;
