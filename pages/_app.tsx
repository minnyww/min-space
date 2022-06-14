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
        {/* @ts-ignore */}
        <GlobalStyle />
        <Component {...pageProps} />
      </NextUIProvider>

    </>
    // </NextThemesProvider>
  );
}

export default MyApp;
