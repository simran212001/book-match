//  Styles
import "@/styles/globals.css";
//  Next.js modules
import { AppProps } from "next/app";
//  Custom modules
import Provider from "@/redux/Provider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
