import { createStore } from "redux";
import { TProduct } from "types";
import { calculateTotal } from "utils";

export interface ICartState {
  cartItems: TProduct[];
  cartTotal: string;
  currencySign: string;
}

const initialState: ICartState = {
  cartItems: [],
  cartTotal: "0.00",
  currencySign: "₪",
};

type PayloadAction = {
  type:
    | "product/incremented"
    | "product/decremented"
    | "product/removed"
    | "product/commentSelected"
    | "product/unitTypeSelected"
    | "cart/removed";
  payload: TProduct;
};
/**
 * This is a reducer - a function that takes a current state value and an
 * action object describing "what happened", and returns a new state value.
 * A reducer's function signature is: (state, action) => newState
 *
 * The Redux state should contain only plain JS objects, arrays, and primitives.
 * The root state value is usually an object. It's important that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * You can use any conditional logic you want in a reducer. In this example,
 * we use a switch statement, but it's not required.
 */
export function cartReducer(state = initialState, action: PayloadAction) {
  switch (action.type) {
    case "product/incremented":
      const product = { ...action.payload };
      let newState = { ...state };
      if (!newState.cartItems.some((item) => item.id === product.id)) {
        product.quantity = product.primaryQuantityUnit!.sellingUnit.amountJumps;
        newState.cartItems.unshift(product);
      } else {
        const newProduct = newState.cartItems.filter((item) => item.id === product.id)[0];
        newState.cartItems = newState.cartItems.filter((item) => item.id !== product.id);
        newProduct.quantity = newProduct.quantity! + newProduct.primaryQuantityUnit.sellingUnit.amountJumps;
        newState.cartItems.unshift(newProduct);
      }
      newState.cartTotal = calculateTotal(newState.cartItems);

      return newState;

    case "product/decremented":
      return state;
    default:
      return state;
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
// let store = createStore(cartReducer);

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// There may be additional use cases where it's helpful to subscribe as well.

// store.subscribe(() => console.log(store.getState()));

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
// store.dispatch({ type: 'counter/incremented' })
// {value: 1}
// store.dispatch({ type: 'counter/incremented' })
// {value: 2}
// store.dispatch({ type: 'counter/decremented' })
// {value: 1}

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { TProduct } from "types";
// import { calculateTotal } from "utils";

// export interface ICartState {
//   cartItems: TProduct[];
//   cartTotal: string;
//   currencySign: string;
// }

// const initialState: ICartState = {
//   cartItems: [],
//   cartTotal: "0.00",
//   currencySign: "₪",
// };

// export const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     onIncrementQuantity: (state, action: PayloadAction<TProduct>) => {
//       const product = { ...action.payload };
//       if (!state.cartItems.some((item) => item.id === product.id)) {
//         product.quantity = product.primaryQuantityUnit.sellingUnit.amountJumps;
//         state.cartItems.unshift(product);
//       } else {
//         const newProduct = state.cartItems.filter((item) => item.id === product.id)[0];
//         state.cartItems = state.cartItems.filter((item) => item.id !== product.id);
//         newProduct.quantity = newProduct.quantity! + newProduct.primaryQuantityUnit.sellingUnit.amountJumps;
//         state.cartItems.unshift(newProduct);
//       }
//       state.cartTotal = calculateTotal(state.cartItems);
//     },
//     onDecrementQuantity: (state, action: PayloadAction<TProduct>) => {
//       const product = { ...action.payload };
//       const newProduct = state.cartItems.filter((item) => item.id === product.id)[0];
//       if (newProduct.quantity! > newProduct.primaryQuantityUnit.sellingUnit.amountJumps) {
//         state.cartItems = state.cartItems.filter((item) => item.id !== product.id);
//         newProduct.quantity = newProduct.quantity! - newProduct.primaryQuantityUnit.sellingUnit.amountJumps;
//         state.cartItems.unshift(newProduct);
//       } else {
//         state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
//       }
//       state.cartTotal = calculateTotal(state.cartItems);
//     },
//     onRemoveProduct: (state, action: PayloadAction<TProduct>) => {
//       state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
//     },
//     onProductCommentSelect: (state, action) => {
//       // product.comment = product.commentType?.comments.find((comment) => comment.id === commentValue);
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { onIncrementQuantity, onDecrementQuantity, onRemoveProduct } = cartSlice.actions;

// export default cartSlice.reducer;
