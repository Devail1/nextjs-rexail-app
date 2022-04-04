import { useState } from "react";
import { TProduct } from "types";

type TCartState = {
  cartItems: TProduct[];
  cartTotal: string;
  currencySign: string;
};

export function useCartState() {
  const initialValue = {
    cartItems: [],
    cartTotal: "0.00",
    currencySign: "₪",
  };
  const [cartState, setCartState] = useState<TCartState>(initialValue);

  const onIncreaseProductQuantity = (product: TProduct) => {
    if (!product.quantity || product.quantity < product.primaryQuantityUnit.maxAmount) {
      product.quantity = product.quantity
        ? product.quantity + product.primaryQuantityUnit.sellingUnit.amountJumps
        : product.primaryQuantityUnit.sellingUnit.amountJumps;

      if (!cartState.cartItems.includes(product)) {
        let arr = [product, ...cartState.cartItems];
        setCartState({
          ...cartState,
          cartItems: arr,
          cartTotal: calculateTotal(arr),
        });
      } else {
        setCartState({
          ...cartState,
          cartTotal: calculateTotal(cartState.cartItems),
        });
      }
    }
  };

  const onDecreaseProductQuantity = (product: TProduct) => {
    if (product.quantity! > product.primaryQuantityUnit.sellingUnit.amountJumps) {
      product.quantity = product.quantity! - product.primaryQuantityUnit.sellingUnit.amountJumps;
      if (!cartState.cartItems.includes(product)) {
        let arr = [product, ...cartState.cartItems];
        setCartState({
          ...cartState,
          cartItems: arr,
          cartTotal: calculateTotal(arr),
        });
      } else {
        setCartState({
          ...cartState,
          cartTotal: calculateTotal(cartState.cartItems),
        });
      }
    } else onRemoveProduct(product);
  };

  const onRemoveProduct = (product: TProduct) => {
    product.quantity = undefined;
    let arr = cartState.cartItems.filter((item) => item.id !== product.id);
    setCartState({
      ...cartState,
      cartItems: arr,
      cartTotal: calculateTotal(arr),
    });
  };

  function onClearCart() {
    cartState.cartItems.forEach((item) => (item.quantity = undefined));
    setCartState(initialValue);
  }

  function calculateTotal(array: TProduct[]) {
    const initialValue = 0;
    const sumWithInitial = array.reduce(
      (totalSum: number, product: TProduct) => totalSum + product.price * product.quantity!,
      initialValue
    );

    return sumWithInitial.toFixed(2);
  }

  return { cartState, setCartState, onIncreaseProductQuantity, onDecreaseProductQuantity, onClearCart };
}
