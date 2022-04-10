import "wdyr";

import "../styles/globals.css";
import App from "next/app";
import type { AppProps } from "next/app";

import { TCategory, TStoreData } from "types";

import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { TCartActions, TCartState, TCartStore, useCartStore } from "hooks/useCartStore";
import { formatData } from "utils";

import Layout from "components/Layout";

interface MyAppProps extends AppProps {
  storeData: TStoreData;
  productsData: TCategory[];
}

export type TDataContextProvider = {
  storeData: TStoreData;
  productsData: TCategory[];
  // cartStore: TCartStore;
  cartActions: TCartActions;
  cartState: TCartState;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

type TDataContextProviderProps = {
  dataStore: TDataContextProvider;
  setDataStore: Dispatch<SetStateAction<TDataContextProvider>>;
};

export const DataContext = createContext<TDataContextProviderProps>({} as TDataContextProviderProps);

function MyApp({ Component, pageProps, storeData, productsData }: MyAppProps) {
  console.log("App Rendered");

  const [dataStore, setDataStore] = useState({} as TDataContextProvider);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (storeData && productsData)
      setDataStore({
        ...dataStore,
        storeData,
        productsData,
        searchQuery,
        setSearchQuery,
        // cartActions,
        // cartState,
      });
  }, []);

  return (
    <DataContext.Provider value={{ dataStore, setDataStore }}>
      <Layout>
        <Component {...pageProps} />
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
