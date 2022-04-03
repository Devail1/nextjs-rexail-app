import { createContext } from "react";
import { TCategory, TStoreData } from "types";

export type TDataContextProvider = {
  storeData: TStoreData;
  productsData: TCategory[];
};

const DataContext = createContext<TDataContextProvider>({} as TDataContextProvider);

export default DataContext;
