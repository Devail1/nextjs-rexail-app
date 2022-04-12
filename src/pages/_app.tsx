import "wdyr";

import axios from "axios";

import "../styles/globals.css";
import App from "next/app";
import type { AppProps } from "next/app";

import { TCategory, TStoreData } from "types";

import { createContext, Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { TCartStore, useCartStore } from "hooks/useCartStore";
import { formatData } from "utils";

import Layout from "components/Layout";

interface MyAppProps extends AppProps {
  storeData: TStoreData;
  productsData: TCategory[];
}

export type TDataContextProvider = {
  storeData: TStoreData;
  productsData: TCategory[];
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

export const DataContext = createContext<TDataContextProvider>({} as TDataContextProvider);
export const CartContext = createContext<TCartStore>({} as TCartStore);

function MyApp({ Component, pageProps, storeData, productsData }: MyAppProps) {
  console.log("App Rendered");

  const [searchQuery, setSearchQuery] = useState("");

  const cartStore = useCartStore();

  const cartStoreValue = useMemo(() => {
    return cartStore;
  }, [cartStore]);

  return (
    <DataContext.Provider value={{ storeData, productsData, searchQuery, setSearchQuery }}>
      <Layout>
        <CartContext.Provider value={cartStoreValue}>
          <Component {...pageProps} />
        </CartContext.Provider>
      </Layout>
    </DataContext.Provider>
  );
}

MyApp.getInitialProps = async (appContext: any) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  const response1 = await axios.get(
    "https://test.rexail.co.il/client/public/store/website?domain=testeitan.rexail.co.il"
  );

  const storeData: TStoreData = response1.data.data;

  const response2 = await axios.get(
    `https://test.rexail.co.il/client/public/store/catalog?s_jwe=${storeData.jsonWebEncryption}`
  );

  const productsData = formatData(response2.data.data);

  let appData = { storeData, productsData };

  return { ...appProps, ...appData };
};

// MyApp.whyDidYouRender = {
//   logOnDifferentValues: true,
//   customName: "MyApp",
// };

export default MyApp;
