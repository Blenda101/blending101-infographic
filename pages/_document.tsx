import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="subject"
          content="United State Chronic Disease Interactive Data Story"
        />
        <meta
          name="description"
          content=" Explore US Chronic Disease prevalence and death rates. Interactively compare diseases along with race, sex and age."
        />
        <meta property="og:title" content="The Rock" />
        <meta
          property="og:url"
          content="https://blending101.com/viz/chronic-morbidity/"
        />
        <meta
          property="og:image"
          content="https://images.pexels.com/photos/15521519/pexels-photo-15521519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
