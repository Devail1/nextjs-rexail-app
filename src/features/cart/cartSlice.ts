import { TProduct, Unit } from "types";
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
  payload: TProduct & { product: TProduct; productSellingUnit: Unit };
};
export function cartReducer(state = initialState, action: PayloadAction) {
  switch (action.type) {
    case "product/incremented": {
      if (!state.cartItems.some((item) => item.id === action.payload.id)) {
        action.payload.quantity = action.payload.primaryQuantityUnit!.sellingUnit.amountJumps;
        state.cartItems.unshift(action.payload);
      } else {
        const newProduct = state.cartItems.filter((item) => item.id === action.payload.id)[0];
        state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
        newProduct.quantity = newProduct.quantity! + newProduct.primaryQuantityUnit.sellingUnit.amountJumps;
        state.cartItems.unshift(newProduct);
      }
      state.cartTotal = calculateTotal(state.cartItems);

      return { ...state };
    }
    case "product/decremented": {
      if (action.payload.quantity! > action.payload.primaryQuantityUnit.sellingUnit.amountJumps) {
        state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
        action.payload.quantity =
          action.payload.quantity! - action.payload.primaryQuantityUnit.sellingUnit.amountJumps;
        state.cartItems.unshift(action.payload);
      } else {
        action.payload.quantity = undefined;
        state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
      }
      state.cartTotal = calculateTotal(state.cartItems);

      return { ...state };
    }
    case "cart/cleared":
      state.cartItems.forEach((item) => (item.quantity = undefined));
      return { cartItems: [], cartTotal: "0.00" };

    case "product/removed":
      action.payload.quantity = undefined;
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
      return { ...state };

    // case "product/commentSelected":
    //   action.payload.comment = action.payload.commentType?.comments.find(
    //     (comment) => comment.id === commentValue
    //   );

    case "product/unitTypeSelected": {
      const { product, productSellingUnit } = action.payload;
      // Check the new unit weight and modify the price accordingly, if the new unit weight is higher, than multiply the price by it,
      // else, divide the price by the previous unit weight value, do the same for old price.
      if (product.primaryQuantityUnit.estimatedUnitWeight! < productSellingUnit.estimatedUnitWeight!) {
        product.price = Number((product.price * productSellingUnit.estimatedUnitWeight!).toFixed(2));
        if (product.originalPrice) {
          product.originalPrice = Number(
            (product.originalPrice * productSellingUnit.estimatedUnitWeight!).toFixed(2)
          );
        }
      } else if (product.primaryQuantityUnit.estimatedUnitWeight !== productSellingUnit.estimatedUnitWeight) {
        product.price = Number((product.price / product.primaryQuantityUnit.estimatedUnitWeight!).toFixed(2));
        if (product.originalPrice) {
          product.originalPrice = Number(
            (product.originalPrice / product.primaryQuantityUnit.estimatedUnitWeight!).toFixed(2)
          );
        }
      }

      // Assign to product the new quantity unit
      product.primaryQuantityUnit = productSellingUnit;

      // Convert float to int if unit type is not supporting floats
      if (product.primaryQuantityUnit.sellingUnit.amountJumps === 1) {
        product.quantity =
          product.quantity! < 1 ? Math.round(product.quantity!) : Math.floor(product.quantity!);
      }

      // Update product's quantity based on unit type max amount
      if (product.quantity && product.quantity > product.primaryQuantityUnit.maxAmount) {
        product.quantity = product.primaryQuantityUnit.maxAmount;
      }

      return { ...state };
    }

    default:
      return state;
  }
}
