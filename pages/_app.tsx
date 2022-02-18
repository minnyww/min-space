// import "../styles/globals.css";
import type { AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyles";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const darkTheme = createTheme({
  type: "dark",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <NextThemesProvider
    //   defaultTheme="system"
    //   attribute="class"
    //   value={{
    //     dark: darkTheme.className,
    //   }}
    // >
    <NextUIProvider theme={darkTheme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </NextUIProvider>
    // </NextThemesProvider>
  );
}

export default MyApp;
