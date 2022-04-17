import { TCategory } from "types";

type PayloadAction = {
  type: "productsCatalog/saveStoreProducts";
  payload: TCategory[];
};

export function productsCatalogReducer(state = [], action: PayloadAction) {
  switch (action.type) {
    case "productsCatalog/saveStoreProducts": {
      return action.payload;
    }
    default:
      return state;
  }
}
