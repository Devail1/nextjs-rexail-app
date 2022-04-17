import "wdyr";

import axios from "axios";

import "../styles/globals.css";
import App from "next/app";
import type { AppProps } from "next/app";

import React, { useEffect, useMemo, useState } from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import { cartReducer } from "features/cart/cartSlice";
import { productsCatalogReducer } from "features/productsCatalog/productsCatalogSlice";
import { storeDetailsReducer } from "features/storeDetails/storeDetailsSlice";
import { searchQueryReducer } from "features/searchQuery/searchQuerySlice";
import { configReducer } from "features/config/configSlice";

import { TCategory, TstoreDetails } from "types";
import { formatData } from "utils";

import Layout from "components/Layout";
interface MyAppProps extends AppProps {
  storeDetails: TstoreDetails;
  productsCatalog: TCategory[];
}

function MyApp({ Component, pageProps, storeDetails, productsCatalog }: MyAppProps) {
  const rootReducer = combineReducers({
    cart: cartReducer,
    products: productsCatalogReducer,
    store: storeDetailsReducer,
    search: searchQueryReducer,
    config: configReducer,
  });

  const [store, setStore] = useState(createStore(rootReducer));

  const memoizedProductsCatalog = useMemo(() => productsCatalog, []);

  let initialStoreState = {
    products: memoizedProductsCatalog,
    store: storeDetails,
  } as object;

  useEffect(() => {
    const composeEnhancers =
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();

    setStore(createStore(rootReducer, initialStoreState, composeEnhancers));
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

MyApp.getInitialProps = async (appContext: any) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  const response1 = await axios.get(
    "https://test.rexail.co.il/client/public/store/website?domain=testeitan.rexail.co.il"
  );

  const storeDetails: TstoreDetails = response1.data.data;

  const response2 = await axios.get(
    `https://test.rexail.co.il/client/public/store/catalog?s_jwe=${storeDetails.jsonWebEncryption}`
  );

  const productsCatalog = formatData(response2.data.data);

  let appData = { storeDetails, productsCatalog };

  return { ...appProps, ...appData };
};

// MyApp.whyDidYouRender = {
//   logOnDifferentValues: true,
//   customName: "MyApp",
// };

export default MyApp;
