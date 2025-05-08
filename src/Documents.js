// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Find top doctors by specialization on Apollo 24/7 clone." />
        <meta property="og:title" content="Apollo Clone - Doctor Listing" />
        <meta property="og:description" content="Browse and filter doctors by location and specialization." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Apollo Doctor Listing</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
