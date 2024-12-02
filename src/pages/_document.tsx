import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Dooing - A minimalist todo list manager for Neovim"
        />
        <meta name="theme-color" content="#16161E" />
        <link rel="icon" href="/favicon.ico" />
        <title>Dooing - Todo Manager for Neovim</title>
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
