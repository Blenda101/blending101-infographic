import "../styles/style.css";
import "swiper/css";
import "swiper/css/navigation";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
