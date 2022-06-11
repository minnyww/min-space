// import "../styles/globals.css";
import type { AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyles";
import "../styles/globals.css";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import Script from "next/script";


function MyApp({ Component, pageProps }: AppProps) {
  const darkTheme = createTheme({
    type: "dark",
  });

  return (
    // <NextThemesProvider
    //   defaultTheme="system"
    //   attribute="class"
    //   value={{
    //     dark: darkTheme.className,
    //   }}
    // >
    <>
      <NextUIProvider theme={darkTheme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </NextUIProvider>
      <Script
        id="Adsense-id"
        data-ad-client="ca-pub-9048050181020642"
        async
        strategy="beforeInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9048050181020642"
        crossOrigin="anonymous"
      />
    </>
    // </NextThemesProvider>
  );
}

export default MyApp;
