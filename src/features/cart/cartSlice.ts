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
  payload: TProduct & { product: TProduct; productSellingUnit: Unit } & {
    product: TProduct;
    commentID: string;
  };
};
export function cartReducer(state = initialState, action: PayloadAction) {
  switch (action.type) {
    case "product/incremented": {
      const product = action.payload;

      product.quantity = product.quantity
        ? product.quantity + product.primaryQuantityUnit!.sellingUnit.amountJumps
        : product.primaryQuantityUnit!.sellingUnit.amountJumps;

      // If the product is not in the cart than increament quantity and push to cart
      if (!state.cartItems.some((item) => item.id === action.payload.id)) state.cartItems.unshift(product);

      // Update cart total
      state.cartTotal = calculateTotal(state.cartItems);

      // Return new state
      return { ...state };
    }
    case "product/decremented": {
      const product = action.payload;

      if (product.quantity! > product.primaryQuantityUnit.sellingUnit.amountJumps) {
        // If product quantity has not reached min value
        product.quantity = product.quantity! - product.primaryQuantityUnit.sellingUnit.amountJumps;
      } else {
        product.quantity = undefined;
        state.cartItems = state.cartItems.filter((item) => item.id !== product.id);
      }

      state.cartTotal = calculateTotal(state.cartItems);

      return { ...state };
    }
    case "cart/cleared":
      state.cartItems.forEach((item) => (item.quantity = undefined));
      let initialState = { cartItems: [], cartTotal: "0.00" };
      return initialState;

    case "product/removed":
      const product = action.payload;
      product.quantity = undefined;
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);

      return { ...state };

    case "product/commentSelected": {
      const { product, commentID } = action.payload;
      product.comment = product.commentType?.comments.find((comment) => comment.id === commentID);

      return { ...state };
    }

    // Function is checking for the new unit weight and modifies the price accordingly,
    // if the new unit weight is higher, than it multiplies the price by the unit weight,
    // else, if it is lower, divide the price by the previous unit weight value, func does the same for old price.
    case "product/unitTypeSelected": {
      const { product, productSellingUnit } = action.payload;

      // Assign to product the new quantity unit
      product.primaryQuantityUnit = productSellingUnit;

      if (product.primaryQuantityUnit?.estimatedUnitWeight! < productSellingUnit.estimatedUnitWeight!) {
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

      if (product.quantity) {
        if (product.primaryQuantityUnit.sellingUnit.amountJumps === 1) {
          // Convert float to int if unit type is not supporting floats
          product.quantity =
            product.quantity! < 1 ? Math.round(product.quantity!) : Math.floor(product.quantity!);
        }

        // Update product's quantity based on unit type max amount
        if (product.quantity && product.quantity > product.primaryQuantityUnit.maxAmount) {
          product.quantity = product.primaryQuantityUnit.maxAmount;
        }
      }

      return { ...state };
    }

    default:
      return state;
  }
}
