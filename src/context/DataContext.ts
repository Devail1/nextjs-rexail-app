import { createContext } from "react";
import { TCategory } from "types";

const DataContext = createContext<{ storeData: object; productsData: TCategory[] }>({
  storeData: {},
  productsData: [],
});

export default DataContext;
