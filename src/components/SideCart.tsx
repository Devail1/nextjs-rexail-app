import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useScrollPosition from "hooks/useScrollPosition";
import Link from "next/link";
import { TProduct } from "types";

import List from "./List";
import SideCartItem from "./SideCartItem";

type Props = {
  minimizeSideCart: boolean;
  setMinimizeSideCart: Dispatch<SetStateAction<boolean>>;
};

const SideCart = ({ minimizeSideCart, setMinimizeSideCart }: Props) => {
  const {
    cart: { cartItems, cartTotal },
    config: { currencySign },
  } = useSelector((state: any) => state);

  const dispatch = useDispatch();

  const scrollPosition = useScrollPosition();

  const [containerHeight, setContainerHeight] = useState<number>(330);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef && window && scrollPosition < 300) {
      const refDimensions = containerRef.current?.getBoundingClientRect();
      if (refDimensions) setContainerHeight(window.innerHeight - refDimensions.y);
    }
  }, [scrollPosition]);

  return (
    <div className={minimizeSideCart ? "side-cart-wrapper minimized" : "side-cart-wrapper"}>
      <section className="side-cart" ref={containerRef} style={{ height: containerHeight - 20 }}>
        <div className="side-cart-header display-flex align-center px-16">
          <button className="mt-5" type="button" onClick={() => setMinimizeSideCart(!minimizeSideCart)}>
            <img
              className={minimizeSideCart ? "w-22 h-22 ml-10 c-p rotate-180" : "w-22 h-22 ml-10 c-p rotate-0"}
              src="/icons/button-arrow-up.svg"
            />
          </button>
          <img className="icon-basket" src="/icons/icon-basket-green.svg" />
          <span className="text-sm font-white mt-8 side-cart-items-count">{cartItems.length}</span>
          <div className="display-flex flex-vertical font-white mr-8 ml-auto">
            <span className="text-weight-300 font-size-14">סל הקניות שלי</span>
            <span className="font-size-18">
              {currencySign}
              {cartTotal}
            </span>
          </div>
          <button
            type="button"
            className="proceed-to-checkout-btn font-white font-size-16"
            disabled={!cartItems.length}
          >
            <span>
              {!cartItems.length ? (
                <a>המשך לתשלום</a>
              ) : (
                <Link href="/cart">
                  <a>המשך לתשלום</a>
                </Link>
              )}
            </span>
          </button>
        </div>
        <div className="side-cart-subheader px-16">
          <button
            type="button"
            className="c-p display-flex align-center h-full w-85 mr-auto"
            onClick={() => dispatch({ type: "cart/cleared" })}
          >
            <img src="/icons/icon-trash.svg" />
            <span className="mr-5 font-size-14"> מחיקת סל </span>
          </button>
        </div>
        <div className="cart-items-preview-wrapper" style={{ height: containerHeight - 220 }}>
          {!cartItems.length ? (
            <div className="display-flex flex-vertical align-center pt-20">
              <img src="/images/empty-basket.png" />
              <span className="mt-10 font-size-22 font-blue text-weight-700 font-heebo">
                סל הקניות שלכם ריק
              </span>
              <span className="font-blue font-size-16">התחילו להוסיף מוצרים</span>
            </div>
          ) : (
            <List<TProduct>
              items={cartItems}
              renderItem={(item) => <SideCartItem key={item.id} currencySign={currencySign} product={item} />}
            />
          )}
        </div>
        <div className="side-cart-footer px-28 display-flex flex-vertical align-center justify-center">
          <button type="button" className="btn-green w-full" disabled={!cartItems.length}>
            {!cartItems.length ? (
              <a className="w-full h-full">
                <div className="display-flex align-center justify-between h-full">
                  <span className="font-heebo text-weight-500 font-white checkout-text">המשך לתשלום</span>
                  <span className="font-heebo text-weight-500 font-white total-sum">
                    {currencySign}
                    {cartTotal}
                  </span>
                </div>
              </a>
            ) : (
              <Link href="/cart">
                <a className="w-full h-full">
                  <div className="display-flex align-center justify-between h-full">
                    <span className="font-heebo text-weight-500 font-white checkout-text">המשך לתשלום</span>
                    <span className="font-heebo text-weight-500 font-white total-sum">
                      {currencySign}
                      {cartTotal}
                    </span>
                  </div>
                </a>
              </Link>
            )}
          </button>
          <span className="font-darkgray font-size-14 mt-5">שערוך. עלות סופית לפני שקילה.</span>
        </div>
      </section>
    </div>
  );
};

export default SideCart;
