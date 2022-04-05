import "../styles/globals.css";
import App from "next/app";
import type { AppProps } from "next/app";

import { TCategory, TStoreData } from "types";

import { createContext } from "react";
import { useCartState } from "hooks/useCartState";
import { formatData } from "utils";

import Layout from "components/Layout";

interface MyAppProps extends AppProps {
  storeData: TStoreData;
  productsData: TCategory[];
}

export type TDataContextProvider = {
  storeData: TStoreData;
  productsData: TCategory[];
};

export const DataContext = createContext<TDataContextProvider>({} as TDataContextProvider);

function MyApp({ Component, pageProps, storeData, productsData }: MyAppProps) {
  const cartState = useCartState();

  return (
    <DataContext.Provider value={{ storeData, productsData }}>
      <Layout>
        <Component {...pageProps} {...cartState} />
      </Layout>
    </DataContext.Provider>
  );
}

MyApp.getInitialProps = async (appContext: any) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  // Call an external API endpoint to get store data.
  const res1 = await fetch(
    "https://test.rexail.co.il/client/public/store/website?domain=testeitan.rexail.co.il"
  );
  const response1 = await res1.json();
  const storeData: TStoreData = response1.data;

  // Call an external API endpoint to get products data with json web token.
  const res2 = await fetch(
    `https://test.rexail.co.il/client/public/store/catalog?s_jwe=${storeData.jsonWebEncryption}`
  );
  const response2 = await res2.json();
  const productsData = formatData(response2.data);

  let appData = { storeData, productsData };

  return { ...appProps, ...appData };
};

export default MyApp;
