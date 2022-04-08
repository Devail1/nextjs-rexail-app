import { useState } from "react";
import { TProduct, Unit } from "types";

export type TCartStore = {
  cartState: TCartState;
  cartActions: TCartActions;
};

export type TCartState = {
  cartItems: TProduct[];
  cartTotal: string;
  currencySign: string;
};

export type TCartActions = {
  onIncreaseProductQuantity(product: TProduct): void;
  onDecreaseProductQuantity(product: TProduct): void;
  onRemoveProduct(product: TProduct): void;
  onProductCommentSelect(product: TProduct, commentValue: string): void;
  onUnitTypeChange(product: TProduct, newQuantityUnit: Unit): void;
  onClearCart(): void;
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

      let arr = [product, ...cartState.cartItems];

      if (!cartState.cartItems.includes(product)) {
        setCartState({
          ...cartState,
          cartItems: arr,
          cartTotal: calculateTotal(arr),
        });
      } else {
        updateCart();
      }
    }
  };

  const onDecreaseProductQuantity = (product: TProduct) => {
    if (product.quantity! > product.primaryQuantityUnit.sellingUnit.amountJumps) {
      product.quantity = product.quantity! - product.primaryQuantityUnit.sellingUnit.amountJumps;
      updateCart();
    } else {
      onRemoveProduct(product);
    }
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

  const onProductCommentSelect = (product: TProduct, commentValue: string) => {
    product.comment = product.commentType?.comments.find((comment) => comment.id === commentValue);

    updateCart();
  };

  const onUnitTypeChange = (product: TProduct, newQuantityUnit: Unit) => {
    // Check the new unit weight and modify the price accordingly, if the new unit weight is higher, than multiply the price by it,
    // else, divide the price by the previous unit weight value, do the same for old price.
    if (product.primaryQuantityUnit.estimatedUnitWeight! < newQuantityUnit.estimatedUnitWeight!) {
      product.price = Number((product.price * newQuantityUnit.estimatedUnitWeight!).toFixed(2));
      if (product.originalPrice) {
        product.originalPrice = Number(
          (product.originalPrice * newQuantityUnit.estimatedUnitWeight!).toFixed(2)
        );
      }
    } else if (product.primaryQuantityUnit.estimatedUnitWeight !== newQuantityUnit.estimatedUnitWeight) {
      product.price = Number((product.price / product.primaryQuantityUnit.estimatedUnitWeight!).toFixed(2));
      if (product.originalPrice) {
        product.originalPrice = Number(
          (product.originalPrice / product.primaryQuantityUnit.estimatedUnitWeight!).toFixed(2)
        );
      }
    }

    // Assign to product the new quantity unit
    product.primaryQuantityUnit = newQuantityUnit;

    // Convert float to int if unit type is not supporting floats
    if (product.primaryQuantityUnit.sellingUnit.amountJumps === 1) {
      product.quantity =
        product.quantity! < 1 ? Math.round(product.quantity!) : Math.floor(product.quantity!);
    }

    // Update product's quantity based on unit type max amount
    if (product.quantity && product.quantity > product.primaryQuantityUnit.maxAmount) {
      product.quantity = product.primaryQuantityUnit.maxAmount;
    }

    updateCart();
  };

  const onClearCart = () => {
    cartState.cartItems.forEach((item) => (item.quantity = undefined));
    setCartState(initialValue);
  };

  const calculateTotal = (array?: TProduct[]) => {
    let arr = array?.length ? array : [...cartState.cartItems];
    const initialValue = 0;
    const sumWithInitial = arr.reduce(
      (totalSum: number, product: TProduct) => totalSum + product.price * product.quantity!,
      initialValue
    );
    if (isNaN(sumWithInitial)) return "0.00";
    return sumWithInitial.toFixed(2);
  };

  // Calling setState in order to re-render relevant component(s)
  const updateCart = () => {
    setCartState({ ...cartState, cartTotal: calculateTotal() });
  };

  return {
    cartState,
    cartActions: {
      onIncreaseProductQuantity,
      onDecreaseProductQuantity,
      onClearCart,
      onRemoveProduct,
      onProductCommentSelect,
      onUnitTypeChange,
    },
  };
}
