import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "components/Layout";
import { createContext } from "react";
import { useFetchData } from "hooks/useFetchData";
import DataContext from "context/dataContext";

function MyApp({ Component, pageProps }: AppProps) {
  let appData = useFetchData();

  return (
    <DataContext.Provider value={appData}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DataContext.Provider>
  );
}

export default MyApp;
