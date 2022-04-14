import { TstoreDetails } from "types";

type PayloadAction = {
  type: "storeDetails/saveStoreDetails";
  payload: TstoreDetails[];
};

export function storeDetailsReducer(state = [], action: PayloadAction) {
  switch (action.type) {
    case "storeDetails/saveStoreDetails": {
      return action.payload;
    }
    default:
      return state;
  }
}
