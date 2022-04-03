import { createContext } from "react";
import { TCategory, TStoreData } from "types";

const DataContext = createContext<{ storeData: TStoreData; productsData: TCategory[] }>(null!);

export default DataContext;
