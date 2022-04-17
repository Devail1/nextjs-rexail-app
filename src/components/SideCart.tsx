import Link from "next/link";

import List from "./List";
import SideCartItem from "./SideCartItem";
import { useDispatch, useSelector } from "react-redux";
import { TProduct } from "types";
import useDimensions from "react-use-dimensions";

const SideCart = () => {
  const {
    cart: { cartItems, cartTotal },
    config: { currencySign },
  } = useSelector((state: any) => state);

  const dispatch = useDispatch();

  const [ref, { y }] = useDimensions();

  return (
    <div className="side-cart-wrapper ">
      {typeof window !== "undefined" ? (
        <section className="side-cart " ref={ref} style={{ height: window.innerHeight - y - 15 }}>
          <div className="side-cart-header display-flex align-center px-16">
            <img className="w-22 h-22 ml-10" src="/icons/button-arrow-up.svg" />
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
          <div className="cart-items-preview-wrapper" style={{ height: window.innerHeight - y - 200 }}>
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
                renderItem={(item) => (
                  <SideCartItem key={item.id} currencySign={currencySign} product={item} />
                )}
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
      ) : (
        ""
      )}
    </div>
  );
};

export default SideCart;
