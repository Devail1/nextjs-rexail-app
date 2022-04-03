import "../styles/globals.css";
import App from "next/app";

import type { AppProps } from "next/app";
import Layout from "components/Layout";
import DataContext from "context/DataContext";
import { TProduct, TStoreData } from "types";
import { formatData } from "utils";

interface MyAppProps extends AppProps {
  storeData: TStoreData;
  productsData: TProduct[];
}
function MyApp({ Component, pageProps, storeData, productsData }: MyAppProps) {
  return (
    <DataContext.Provider value={{ storeData, productsData }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DataContext.Provider>
  );
}

MyApp.getInitialProps = async (appContext: any) => {
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

  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  let appData = { storeData, productsData };

  return { ...appProps, ...appData };
};

export default MyApp;
