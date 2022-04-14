import "wdyr";

import axios from "axios";

import "../styles/globals.css";
import App from "next/app";
import type { AppProps } from "next/app";

import React, { useEffect, useState } from "react";
import { createStore, combineReducers } from "redux";
import { Provider, useDispatch } from "react-redux";

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

const AppWrapper = ({ productsCatalog, storeDetails, children }: any) => {
  const dispatch = useDispatch();

  const initReduxStore = () => {
    dispatch({ type: "productsCatalog/saveStoreProducts", payload: productsCatalog });
    dispatch({ type: "storeDetails/saveStoreDetails", payload: storeDetails });
  };

  initReduxStore();

  return <div>{children};</div>;
};

function MyApp({ Component, pageProps, storeDetails, productsCatalog }: MyAppProps) {
  console.log("App Rendered");

  const rootReducer = combineReducers({
    cart: cartReducer,
    products: productsCatalogReducer,
    store: storeDetailsReducer,
    search: searchQueryReducer,
    config: configReducer,
  });

  const [store, setStore] = useState(createStore(rootReducer));

  useEffect(() => {
    const composeEnhancers =
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();

    setStore(createStore(rootReducer, composeEnhancers));
  }, []);

  return (
    <Provider store={store}>
      <AppWrapper productsCatalog={productsCatalog} storeDetails={storeDetails}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppWrapper>
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
