import { TProduct } from "types";
import { calculateTotal } from "utils";

export interface ICartState {
  cartItems: TProduct[];
  cartTotal: string;
}

const initialState: ICartState = {
  cartItems: [],
  cartTotal: "0.00",
};

type PayloadAction = {
  type:
    | "product/incremented"
    | "product/decremented"
    | "product/removed"
    | "product/commentSelected"
    | "product/unitTypeSelected"
    | "cart/cleared";
  payload: TProduct;
};
export function cartReducer(state = initialState, action: PayloadAction) {
  switch (action.type) {
    case "product/incremented": {
      let newState = { ...state };
      if (!newState.cartItems.some((item) => item.id === action.payload.id)) {
        action.payload.quantity = action.payload.primaryQuantityUnit!.sellingUnit.amountJumps;
        newState.cartItems.unshift(action.payload);
      } else {
        const newProduct = newState.cartItems.filter((item) => item.id === action.payload.id)[0];
        newState.cartItems = newState.cartItems.filter((item) => item.id !== action.payload.id);
        newProduct.quantity = newProduct.quantity! + newProduct.primaryQuantityUnit.sellingUnit.amountJumps;
        newState.cartItems.unshift(newProduct);
      }
      newState.cartTotal = calculateTotal(newState.cartItems);

      return newState;
    }
    case "product/decremented": {
      let newState = { ...state };

      if (action.payload.quantity! > action.payload.primaryQuantityUnit.sellingUnit.amountJumps) {
        newState.cartItems = newState.cartItems.filter((item) => item.id !== action.payload.id);
        action.payload.quantity =
          action.payload.quantity! - action.payload.primaryQuantityUnit.sellingUnit.amountJumps;
        newState.cartItems.unshift(action.payload);
      } else {
        action.payload.quantity = undefined;
        newState.cartItems = newState.cartItems.filter((item) => item.id !== action.payload.id);
      }
      console.log("file: cartSlice.ts ~ line 67 ~ cartReducer ~ newState.cartItems", newState.cartItems);
      newState.cartTotal = calculateTotal(newState.cartItems);
      return newState;
    }
    case "cart/cleared":
      state.cartItems.forEach((item) => (item.quantity = undefined));
      return { cartItems: [], cartTotal: "0.00" };

    case "product/removed":
      let newState = { ...state };
      action.payload.quantity = undefined;
      newState.cartItems = newState.cartItems.filter((item) => item.id !== action.payload.id);
      return newState;

    // case "product/commentSelected":
    // action.payload.comment = action.payload.commentType?.comments.find((comment) => comment.id === commentValue);

    default:
      return state;
  }
}
