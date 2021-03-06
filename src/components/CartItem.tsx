import { TProduct } from "types";
import { useState } from "react";
import { useDispatch } from "react-redux";

type Props = {
  product: TProduct;
  currencySign: string;
  index: number;
  cartItemsLength: number;
};

const CartItem = ({ product, cartItemsLength, index, currencySign }: Props) => {
  const dispatch = useDispatch();

  const [isUnitTypeDropdownToggled, setIsUnitTypeDropdownToggled] = useState(false);

  return (
    <div
      id={product.id.toString()}
      className={
        index === cartItemsLength
          ? "border-none cart-item display-flex align-center"
          : "cart-item display-flex align-center"
      }
    >
      <div className="thumbnail-container ml-10">
        {product.promoted ? (
          <div className="discount-badge-h display-flex align-center justify-center">
            <div className="display-flex">
              <img
                className="h-20 w-20 font-green mr-15 discount-badge-icon"
                src="/icons/icon-discount.svg"
                alt="item-discount"
              />
              <div className="discount-badge-text font-white mr-10">מבצע</div>
            </div>
            <div className="discount-badge-h-side"></div>
            <div className="discount-badge-h-tip"></div>
          </div>
        ) : (
          ""
        )}
        <div className="hover-tooltip mobile-hide">
          פירות העונה במבצע של 2 יחידות ב47
          {currencySign} . בתוקף עד ה04.01.22
          <div className="tooltip-right-arrow"></div>
        </div>
        <button type="button" onClick={() => dispatch({ type: "product/removed", payload: product })}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-36 w-36 font-red absolute c-p remove-item-btn mt-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {product.imageUrl ? (
          <img alt="product-thumbnail" className="item-thumbnail" src={product.imageUrl} />
        ) : (
          ""
        )}
      </div>
      <div className="w-2-4 mr-10 display-flex flex-vertical justify-center h-full py-5">
        <span className="item-desc"> {product.name} </span>
        <div className="display-flex align-center">
          <span className="text-weight-700 mx-5 text-lg my-auto mobile-show">{product.quantity}</span>
          <div className="select-unit my-3 border-green rounded-25 display-flex align-center justify-between mr-10 mobile-show">
            <span className="text-lg mr-15"> יח' </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 font-green ml-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {product.commentType ? (
          <form ng-model="productForm" name="productForm" className="select-form">
            <label className="display-flex relative w-full">
              <svg
                className={
                  product.comment
                    ? "font-green h-16 w-16 absolute knife-icon "
                    : "font-red h-16 w-16 absolute knife-icon "
                }
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                  stroke="none"
                  fill="currentColor"
                >
                  <path d="M4288 4823 l-86 -88 14 -150 15 -149 -756 -756 -755 -755 288 -288 287 -287 913 913 912 912 -368 368 c-202 202 -369 367 -372 367 -3 0 -44 -39 -92 -87z" />
                  <path d="M1297 1502 l-1299 -1299 29 -11 c99 -41 331 -54 507 -27 636 96 1423 550 2296 1324 130 115 560 522 560 530 0 10 -774 781 -785 781 -6 0 -594 -584 -1308 -1298z" />
                </g>
              </svg>
              <select
                onChange={(e) =>
                  dispatch({
                    type: "product/commentSelected",
                    payload: { product: product, commentID: e.target.value },
                  })
                }
                className={
                  product.comment
                    ? "border-green select-unit c-p mt-10 rounded-25 w-full display-flex align-center justify-between"
                    : "border-red select-unit c-p mt-10 rounded-25 w-full display-flex align-center justify-between"
                }
              >
                <option value="">{product.commentType.name}</option>
                {product.commentType.comments.map((comment) => {
                  return <option key={comment.id} label={comment.name} value={comment.id} />;
                })}
              </select>
              <svg
                className={product.comment ? "font-green select-arrow" : "font-red select-arrow"}
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.5 6.746 1.341 2.587a.786.786 0 0 0-1.11 1.111l4.713 4.715a.786.786 0 0 0 1.112 0l4.714-4.715a.786.786 0 0 0-1.111-1.11L5.5 6.745z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </label>
            {product.commentType && !product.comment ? (
              <div className="mt-5 font-red text-md select-warning">יש לבחור אפשרות אחת</div>
            ) : (
              ""
            )}
          </form>
        ) : (
          ""
        )}
      </div>
      <div className="w-1-4 item-price-wrapper display-flex flex-vertical align-center mt-15">
        <span className="item-price mobile-hide font-size-16 text-weight-300">
          {currencySign}
          {product.price} / {product.primaryQuantityUnit.sellingUnit.name}
        </span>
        <span className="item-price mobile-show">
          {currencySign}
          {(product.price * product.quantity!).toFixed(2)}
        </span>
        {product.promoted && product.originalPrice ? (
          <div>
            <span className="text-muted mobile-hide font-size-13 text-weight-300">
              {currencySign}
              {product.originalPrice}/{product.primaryQuantityUnit.sellingUnit.name}
            </span>
            <span className="text-muted mobile-show">
              {currencySign}
              {(product.originalPrice! * product.quantity!).toFixed(2)}
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="label-wrapper mobile-hide flex-horizontal justify-center item-quantity-container mt-15">
        <button
          type="button"
          className="plus-minus-preview-container"
          onClick={() => dispatch({ type: "product/incremented", payload: product })}
        >
          <img className="h-8 w-8 absolute" src="/icons/icon-plus.svg" />
        </button>
        <div className="display-flex flex-vertical">
          <div className="mx-auto mobile-hide text-weight-500 item-quantity">{product.quantity}</div>
          {product.primaryQuantityUnit.sellingUnit.name && (
            <button
              type="button"
              className={product.productSellingUnits.length === 1 ? "not-active relative" : "relative"}
              onClick={() => setIsUnitTypeDropdownToggled(!isUnitTypeDropdownToggled)}
            >
              <span
                className={
                  product.productSellingUnits.length === 1
                    ? "font-size-13 font-gray-600 unit-label c-p dropdown-disabled"
                    : product.productSellingUnits.length > 1
                    ? "font-size-13 font-gray-600 unit-label c-p dropdown-enabled mr-10"
                    : "font-size-13 font-gray-600 unit-label c-p"
                }
              >
                {product.primaryQuantityUnit.sellingUnit.name}
                {product.productSellingUnits.length > 1 && (
                  <img src="/icons/icon-arrow-down.svg" className="h-7 w-7 font-green mr-2 dropdown-arrow" />
                )}
              </span>
              {isUnitTypeDropdownToggled && (
                <ul className="dropdown-menu-sm display-flex flex-vertical align-center absolute">
                  {product.productSellingUnits.map((productSellingUnit) => {
                    return (
                      <li
                        key={productSellingUnit.id}
                        onClick={() =>
                          dispatch({
                            type: "product/unitTypeSelected",
                            payload: { product, productSellingUnit },
                          })
                        }
                        className="dropdown-item"
                      >
                        <a>{productSellingUnit.sellingUnit.name} </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </button>
          )}
        </div>
        <button
          type="button"
          className="plus-minus-preview-container"
          onClick={() => dispatch({ type: "product/decremented", payload: product })}
        >
          <img className="h-8 w-8 absolute" src="/icons/icon-minus.svg" />
        </button>
      </div>
      <div className="label-wrapper mobile-hide mt-15">
        <div className="mx-auto mobile-hide text-weight-500 item-sum">
          {currencySign}
          {(product.quantity! * product.price).toFixed(2)}
        </div>
        {product.promoted && product.originalPrice ? (
          <div className="font-darkgray text-weight-300 text-linethrough text-sm">
            {currencySign}
            {(product.originalPrice! * product.quantity!).toFixed(2)}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="mobile-show discount-ribbon-wrapper">
        <div className="discount-ribbon absolute display-flex align-center px-20">
          <div className="discount-ribbon-tip-right"></div>
          <div className="discount-ribbon-tip-left"></div>
          <img className="h-36 w-36 font-green mr-15" src="/icons/icon-discount.svg" alt="item-discount" />
          <div className="text-lg font-white mr-10 font-heebo">
            <span className="text-weight-500">זכית בהנחה!</span>
            <span>
              2 מארזי ענבים ב {currencySign}
              44
            </span>
          </div>
          <span className="mr-auto text-lg font-white font-heebo ml-5">
            {currencySign}
            14.00 -
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
