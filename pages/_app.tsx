import "../styles/style.css";
import "../public/css/test.scss";
import "swiper/css";
import "swiper/css/navigation";

import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/Apollo";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />{" "}
    </ApolloProvider>
  );
}
