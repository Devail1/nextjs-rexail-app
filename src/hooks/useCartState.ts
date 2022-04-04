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

  const onAddProduct = (product: TProduct) => {
    if (!product.quantity || product.quantity < product.primaryQuantityUnit.maxAmount) {
      product.quantity = product.quantity
        ? product.quantity + product.primaryQuantityUnit.sellingUnit.amountJumps
        : product.primaryQuantityUnit.sellingUnit.amountJumps;

      if (!cartState.cartItems.includes(product)) {
        setCartState({
          ...cartState,
          cartItems: [product, ...cartState.cartItems],
          cartTotal: calculateTotal([product, ...cartState.cartItems]),
        });
      } else {
        setCartState({
          ...cartState,
          cartTotal: calculateTotal(cartState.cartItems),
        });
      }
    }
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

  return { cartState, setCartState, onAddProduct, onClearCart };
}
