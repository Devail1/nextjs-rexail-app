import { TCartActions } from "hooks/useCartState";
import { useState } from "react";
import { TProduct } from "types";

interface Props {
  product: TProduct;
  currencySign: string;
  cartActions: TCartActions;
}

const SideCartItem = ({ product, currencySign, cartActions }: Props) => {
  const [isUnitTypeDropdownToggled, setIsUnitTypeDropdownToggled] = useState(false);

  return (
    <div id={product.id.toString()} className="item-preview display-flex align-center">
      <div className="thumbnail-container ml-10">
        {product.promoted && (
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
        )}
        <button
          type="button"
          className="cart-preview-btn"
          onClick={() => cartActions.onRemoveProduct(product)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-36 w-36 font-red c-p remove-item-btn preview-btn"
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
        <img alt="product-thumbnail" className="item-thumbnail" src={product.imageUrl} />
      </div>
      <span className="font-size-14 preview-desc">
        {product.name}, {product.productQuality.name}{" "}
      </span>
      <div className="display-flex flex-vertical align-center mx-auto">
        <button
          type="button"
          className="plus-minus-preview-container"
          onClick={() => cartActions.onIncreaseProductQuantity(product)}
        >
          <img className="h-8 w-8" src="/icons/icon-plus.svg" />
        </button>
        <span className="font-size-16 text-weight-500">{product.quantity} </span>
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
                      onClick={() => cartActions.onUnitTypeChange(product, productSellingUnit)}
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
        <button
          type="button"
          className="plus-minus-preview-container"
          onClick={() => cartActions.onDecreaseProductQuantity(product)}
        >
          <img className="h-8 w-8" src="/icons/icon-minus.svg" />
        </button>
      </div>
      <div className="item-price-wrapper display-flex flex-vertical align-center mr-auto ml-5">
        <span className="item-price font-size-16 text-weight-700">
          {currencySign}
          {(product.price * product.quantity!).toFixed(2)}
        </span>
        {product.promoted && product.originalPrice && (
          <span className="font-heebo font-darkgray text-linethrough text-weight-300 font-size-13">
            {currencySign}
            {(product.originalPrice! * product.quantity!).toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
};

export default SideCartItem;
