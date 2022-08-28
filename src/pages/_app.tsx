// src/pages/_app.tsx
import { withTRPC } from "@trpc/next";
import type { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import NiceModal from "@ebay/nice-modal-react";
import type { AppRouter } from "@src/server/router";
import "@src/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <NiceModal.Provider>
      <Component {...pageProps} />
    </NiceModal.Provider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
