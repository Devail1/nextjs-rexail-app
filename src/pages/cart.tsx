import CartItem from "components/CartItem";
import { TCartActions, TCartState } from "hooks/useCartState";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useState } from "react";

type Props = {
  cartState: TCartState;
  cartActions: TCartActions;
};

const Cart: NextPage<Props> = ({ cartState, cartActions }) => {
  const [userComment, setUserComment] = useState("");

  const handleUserComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserComment(e.target.value);
  };

  return (
    <div className="cart-bg">
      <div className="container mx-auto px-28 pt-20">
        <div className="back-btn c-p mb-5">
          <div className="display-flex align-center font-blue">
            <svg className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-weight-500">
              <Link href="/">
                <a>חזרה לחנות</a>
              </Link>
            </span>
          </div>
        </div>
        <svg
          className="h-36 w-36 back-svg font-white c-p"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <div className="display-flex justify-between align-center mb-10">
          <div className="display-flex font-white align-center">
            <span className="items-count">{cartState.cartItems.length}</span>
            <img src="/icons/icon-basket-white.svg" />
            <div className="text-title font-blue mr-5 mt-15 mb-5">סל הקניות שלי</div>
          </div>
        </div>
        <div id="cart-wrapper">
          <div className="cart-widget rounded-10 display-flex flex-vertical">
            <div className="cart-widget-headers font-blue px-20 mobile-hide">
              <div className="w-2-4">
                <div className="display-flex align-center">
                  <span>מוצר</span>
                </div>
              </div>
              <div className="display-flex justify-between w-2-4">
                <span>מחיר ליחידה</span>
                <span>איכות</span>
                <div className="display-flex align-center">
                  <span>סה"כ</span>
                </div>
                <span>הסר</span>
              </div>
            </div>
            <ul id="cart-items-container">
              {!cartState.cartItems.length ? (
                <div className="display-flex flex-vertical align-center py-20 ">
                  <img src="/images/empty-basket.png" />
                  <span className="mt-10 font-size-22 font-blue text-weight-700 font-heebo">
                    סל הקניות שלכם ריק
                  </span>
                  <span className="font-blue font-size-18 mt-5">חזרו לחנות כדי להוסיף מוצרים</span>
                </div>
              ) : (
                cartState.cartItems.map((item, idx) => {
                  return (
                    <CartItem
                      key={item.id}
                      index={idx}
                      cartItemsLength={cartState.cartItems.length - 1}
                      currencySign={cartState.currencySign}
                      product={item}
                      cartActions={cartActions}
                    />
                  );
                })
              )}
            </ul>
          </div>
          <div className="display-flex flex-vertical">
            <span className="text-title font-gray-600 text-xl mb-20 mobile-show mt-20">
              הערות למכין ההזמנה
            </span>
            <form name="cartForm" className="order-summary rounded-10">
              <span className="font-heebo text-lgr text-weight-700 font-blue mobile-hide py-5 my-5 border-bottom-gray-2px">
                סיכום הזמנה
              </span>
              <div className="mt-15 mb-10">
                <span className="font-gray-600 mobile-hide">הערות למכין ההזמנה</span>
              </div>
              <textarea
                id="textarea"
                name="textarea"
                onChange={handleUserComment}
                className="order-comment rounded-10 font-size-16"
              ></textarea>
              {userComment.length < 3 ? (
                <div className="text-center mt-2 font-red">נא מלאו הערות למכין ההזמנה</div>
              ) : (
                ""
              )}
              <div className="mobile-hide mt-30 border-bottom-gray-1px mb-20"></div>
              <div className="display-flex justify-between">
                <span className="mobile-hide font-gray-900">סה"כ סל קניות </span>
                <span className="mobile-hide item-price font-size-16">
                  {cartState.currencySign}
                  {cartState.cartTotal}
                </span>
              </div>
              <div className="display-flex flex-vertical align-center mt-20">
                <button
                  className="mobile-hide h-45 btn-green rounded-10 border-light-gray"
                  disabled={!cartState.cartItems.length || userComment.length < 3}
                >
                  <span className="mobile-hide font-white font-size-18 text-weight-500 mx-auto my-auto">
                    <Link href={!cartState.cartItems.length || userComment.length < 3 ? "#" : "/checkout"}>
                      <a>המשך לתשלום</a>
                    </Link>
                  </span>
                </button>
                <span className="mobile-hide font-darkgray mt-10 font-size-14">
                  שערוך. עלות סופית לפני שקילה.
                </span>
              </div>
            </form>
          </div>
        </div>
        <div id="featured-items-wrapper" className="display-flex flex-vertical mt-30"></div>
      </div>
      <div className="mobile-footer px-28 display-flex flex-vertical align-center justify-center">
        <button type="button" id="submit-cart-btn" className="btn-green rounded-50 w-full mb-15">
          <span className="font-white text-xl checkout-text">המשך לתשלום</span>
          <span className="font-white text-xl total-sum">
            {cartState.currencySign}
            {cartState.cartTotal}
          </span>
        </button>
        <span className="font-darkgray text-lgr"> שערוך. עלות סופית לפני שקילה. </span>
      </div>
    </div>
  );
};

export default Cart;

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {}, // will be passed to the page component as props
  };
};
