import "../styles/style-info.css";
import "swiper/css";
import "swiper/css/navigation";
import "react-tooltip/dist/react-tooltip.css";
import "tippy.js/dist/tippy.css";

import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/Apollo";
import NoSsr from "../components/shared/NoSSR";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NoSsr>
      <ApolloProvider client={client}>
        <Component {...pageProps} />{" "}
      </ApolloProvider>
    </NoSsr>
  );
}
