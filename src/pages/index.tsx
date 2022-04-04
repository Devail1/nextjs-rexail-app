import type { NextPage } from "next";
import { TCategory, TProduct } from "types";

import { useContext, useEffect, useState } from "react";
import { useCartState } from "hooks/useCartState";

import Head from "next/head";
import StoreItem from "components/StoreItem";
import List from "components/List";
import { DataContext } from "pages/_app";
import SideCartItem from "components/SideCartItem";
import Link from "next/link";
import { useRouter } from "next/router";
const Store: NextPage = () => {
  const router = useRouter();
  const { cartState, cartActions } = useCartState();
  const { productsData } = useContext(DataContext);

  const [selectedCategory, setSelectedCategory] = useState<TCategory>({} as TCategory);

  useEffect(() => {
    if (productsData) {
      setSelectedCategory(productsData[0]);
    }
  }, [productsData]);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/public/images/favicon.ico" />
      </Head>
      <nav id="categories" className="categories-wrapper">
        <ul className="container mx-auto h-full display-flex align-center justify-evenly font-gray-900">
          <List<TCategory>
            items={productsData?.slice(0, 10)}
            renderItem={(item) => (
              <li
                key={item.id}
                className={selectedCategory?.id === item.id ? "category selected" : "category"}
              >
                <button type="button" onClick={() => setSelectedCategory(item)}>
                  {item.name}&nbsp;
                </button>
              </li>
            )}
          />
          {productsData.length > 10 ? (
            <ul className="category show-more-categories">
              <span>עוד</span>
              <ul className="categories-show-more display-flex flex-vertical absolute pt-10 rounded-10">
                <List<TCategory>
                  items={productsData?.slice(10, productsData.length)}
                  renderItem={(item) => (
                    <li key={item.id} className="category show-more">
                      <button type="button" onClick={() => setSelectedCategory(item)}>
                        {item.name}&nbsp;
                      </button>
                    </li>
                  )}
                />
              </ul>
            </ul>
          ) : (
            ""
          )}
        </ul>
      </nav>
      <div className="container mx-auto pt-20">
        <div className="display-flex relative">
          <div className="store-widget">
            <h1 className="font-heebo font-blue">{selectedCategory?.name}</h1>
            <div className="store-items-wrapper mt-30">
              <List<TProduct>
                items={selectedCategory?.children!}
                renderItem={(item) => (
                  <StoreItem
                    key={item.id}
                    currencySign={cartState.currencySign}
                    product={item}
                    cartActions={cartActions}
                  />
                )}
              />
            </div>
          </div>
          <div className="cart-preview-wrapper">
            <section className="cart-preview">
              <div className="cart-preview-header display-flex align-center px-16">
                <img className="w-22 h-22 ml-10" src="/icons/button-arrow-up.svg" />
                <img className="icon-basket" src="/icons/icon-basket-green.svg" />
                <span className="text-sm font-white mt-8 cart-preview-items-count">
                  {cartState.cartItems.length}
                </span>
                <div className="display-flex flex-vertical font-white mr-8 ml-auto">
                  <span className="text-weight-300 font-size-14">סל הקניות שלי</span>
                  <span className="font-size-18">
                    {cartState.currencySign}
                    {cartState.cartTotal}
                  </span>
                </div>
                <button
                  type="button"
                  className="proceed-to-checkout-btn font-white font-size-16"
                  disabled={!cartState.cartItems.length}
                  onClick={() => router.push("/cart", undefined, { shallow: true })}
                >
                  <span>
                    <a>המשך לתשלום</a>
                  </span>
                </button>
              </div>
              <div className="cart-preview-subheader px-16">
                <button
                  type="button"
                  className="c-p display-flex align-center h-full w-85 mr-auto"
                  onClick={cartActions.onClearCart}
                >
                  <img src="/icons/icon-trash.svg" />
                  <span className="mr-5 font-size-14"> מחיקת סל </span>
                </button>
              </div>
              <div className="cart-items-preview-wrapper">
                {!cartState.cartItems.length ? (
                  <div className="display-flex flex-vertical align-center pt-20">
                    <img src="/images/empty-basket.png" />
                    <span className="mt-10 font-size-22 font-blue text-weight-700 font-heebo">
                      סל הקניות שלכם ריק
                    </span>
                    <span className="font-blue font-size-16">התחילו להוסיף מוצרים</span>
                  </div>
                ) : (
                  <List<TProduct>
                    items={cartState.cartItems}
                    renderItem={(item) => (
                      <SideCartItem
                        key={item.id}
                        currencySign={cartState.currencySign}
                        product={item}
                        cartActions={cartActions}
                      />
                    )}
                  />
                )}
              </div>
              <div className="cart-preview-footer px-28 display-flex flex-vertical align-center justify-center">
                <button type="button" className="btn-green w-full" disabled={!cartState.cartItems.length}>
                  <Link href={!cartState.cartItems.length ? "#" : "/cart"} shallow={true}>
                    <a className="w-full h-full">
                      <div className="display-flex align-center justify-between h-full">
                        <span className="font-heebo text-weight-500 font-white checkout-text">
                          המשך לתשלום
                        </span>
                        <span className="font-heebo text-weight-500 font-white total-sum">
                          {cartState.currencySign}
                          {cartState.cartTotal}
                        </span>
                      </div>
                    </a>
                  </Link>
                </button>
                <span className="font-darkgray font-size-14 mt-5">שערוך. עלות סופית לפני שקילה.</span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;

export async function getServerSideProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
