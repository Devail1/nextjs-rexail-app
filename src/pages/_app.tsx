import "wdyr";

import axios from "axios";

import "../styles/globals.css";
import App from "next/app";
import type { AppProps } from "next/app";

import { TCategory, TstoreDetails } from "types";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TCartStore, useCartStore } from "hooks/useCartStore";
import { formatData } from "utils";
import { createStore, combineReducers } from "redux";
import { cartReducer } from "features/cart/cartSlice";
import Layout from "components/Layout";
import { productsCatalogReducer } from "features/productsCatalog/productsCatalogSlice";
import { Provider, useDispatch } from "react-redux";
import { storeDetailsReducer } from "features/storeDetails/storeDetailsSlice";
interface MyAppProps extends AppProps {
  storeDetails: TstoreDetails;
  productsCatalog: TCategory[];
}

export type TDataContextProvider = {
  storeDetails: TstoreDetails;
  productsCatalog: TCategory[];
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

export const DataContext = createContext<TDataContextProvider>({} as TDataContextProvider);
export const CartContext = createContext<TCartStore>({} as TCartStore);

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
  });
  const [store, setStore] = useState(createStore(rootReducer));

  useEffect(() => {
    const composeEnhancers =
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();

    setStore(createStore(rootReducer, composeEnhancers));
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const cartStore = useCartStore();

  const cartStoreValue = useMemo(() => {
    return cartStore;
  }, [cartStore]);

  return (
    <Provider store={store}>
      <AppWrapper productsCatalog={productsCatalog} storeDetails={storeDetails}>
        <DataContext.Provider value={{ storeDetails, productsCatalog, searchQuery, setSearchQuery }}>
          <Layout>
            <CartContext.Provider value={cartStoreValue}>
              <Component {...pageProps} />
            </CartContext.Provider>
          </Layout>
        </DataContext.Provider>
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
