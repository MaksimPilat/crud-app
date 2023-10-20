import { AppProps } from "next/app";
import "../styles/global.css";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem attribute="data-theme">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
