import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { TProduct, Unit } from "types";

export interface IStoreItemProps {
  product: TProduct;
  currencySign: string;
}

const StoreItem = ({ product, currencySign }: IStoreItemProps) => {
  console.log("Store Item Render");

  const dispatch = useDispatch();

  let {
    fullName,
    price,
    originalPrice,
    promoted,
    primaryQuantityUnit,
    quantity,
    name,
    imageUrl,
    productSellingUnits,
    currentRelevancy,
    productQuality,
  } = product;

  return (
    <div className="store-item rounded-10 display-flex flex-vertical align-center justify-around">
      <div className="store-item-overlay font-gray-900 text-sm">
        <div className="display-flex flex-vertical align-center justify-around">
          <span className="mb-60">{fullName}</span>
          <div className="display-flex product-rating-wrapper absolute">
            {currentRelevancy?.name == "low" && (
              <div>
                <svg className="h-20 w-20 font-yellow" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="h-20 w-20 font-gray" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="h-20 w-20 font-gray" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            )}
            {currentRelevancy?.name == "medium" && (
              <div>
                <svg className="h-20 w-20 font-yellow" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="h-20 w-20 font-yellow" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="h-20 w-20 font-gray" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            )}
            {currentRelevancy?.name == "high" && (
              <div>
                <svg className="h-20 w-20 font-yellow" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="h-20 w-20 font-yellow" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="h-20 w-20 font-yellow" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            )}
          </div>
          <div className="mt-30 mb-5">
            <span className="font-heebo font-size-18 text-weight-700">
              {currencySign}
              {price}
            </span>
            <span>
              &nbsp;/&nbsp;
              <span className="font-heebo text-weight-500">{primaryQuantityUnit?.sellingUnit.name}</span>
            </span>
          </div>
          {promoted && originalPrice && (
            <div className="font-darkgray text-linethrough text-weight-300 font-size-13">
              <span className="font-heebo">
                {currencySign}
                {originalPrice}
              </span>
              /<span className="font-heebo">{primaryQuantityUnit?.sellingUnit.name}</span>
            </div>
          )}
          <div className="toggle-unit-wrapper display-flex flex-vertical align-center">
            <div className="toggle-unit-container">
              <ul className="display-flex justify-center align-center">
                {productSellingUnits.map((productSellingUnit: Unit) => {
                  return (
                    <li
                      key={productSellingUnit.id}
                      className={
                        productSellingUnits.length === 1 ||
                        productSellingUnit.sellingUnit.name === primaryQuantityUnit.sellingUnit.name
                          ? "toggle-unit selected"
                          : "toggle-unit "
                      }
                    >
                      <button
                        className="h-full"
                        type="button"
                        // onClick={() => cartActions.onUnitTypeChange(product, productSellingUnit)}
                      >
                        {productSellingUnit.sellingUnit.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {!product.quantity ? (
            <button
              type="button"
              className="add-to-cart-btn"
              onClick={() => dispatch({ type: "product/incremented", payload: product })}
            >
              <img src="/icons/icon-plus.svg" />
              <span className="mr-5 text-weight-500"> הוספה לסל </span>
            </button>
          ) : (
            <div className=" add-to-cart-btn">
              <button
                type="button"
                className="h-full w-full"
                onClick={() => dispatch({ type: "product/incremented", payload: product })}
              >
                <img src="/icons/icon-plus.svg" />
              </button>
              <span className=" text-lg mx-12 text-weight-500">{quantity}</span>
              <button
                type="button"
                className=" h-full w-full"
                onClick={() => dispatch({ type: "product/decremented", payload: product })}
              >
                <img className="mb-4" src="/icons/icon-minus.svg" />
              </button>
            </div>
          )}
        </div>
      </div>
      {promoted ? (
        <div className=" discount-badge-v badge-sm">
          <div className=" display-flex flex-vertical align-center">
            <img className="h-16 w-16 font-green mt-3" src="/icons/icon-discount.svg" alt="item-discount" />
            <div className="font-white text-xs mt-2">מבצע</div>
            <div className="discount-badge-v-tip badge-sm" />
          </div>
          <div className="discount-badge-v-side badge-sm" />
        </div>
      ) : (
        ""
      )}
      <div className="item-tag-wrapper">
        {productQuality.displayQuality && (
          <div className="item-tag rounded-10 text-weight-400">{productQuality.name}</div>
        )}
        <svg
          className="h-36 w-36 font-green item-card-info rotate-180"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {quantity ? (
        <div className="quantity-badge font-white">
          <div className="display-flex flex-vertical align-center justify-center mt-2">
            <span className="font-size-14 text-weight-600 font-heebo">{quantity}</span>
            <span className="font-size-10 text-weight-400">{primaryQuantityUnit?.sellingUnit.name}</span>
          </div>
          <div className="quantity-badge-tip" />
        </div>
      ) : (
        ""
      )}
      <div className="display-flex flex-vertical align-center px-20 product-info-wrapper">
        <img alt="product-thumbnail" className="item-thumbnail" src={imageUrl} />
        <span className="font-size-16 text-center mt-5">{name}</span>
      </div>
      <div className="display-flex flex-vertical align-center product-price-wrapper">
        <div>
          <span className="font-heebo font-size-18 text-weight-700">
            {currencySign}
            {price}
          </span>
          {primaryQuantityUnit.sellingUnit.name ? (
            <span>
              &nbsp;/&nbsp;
              <span className="font-heebo text-sm text-weight-500">
                {primaryQuantityUnit?.sellingUnit.name}
              </span>
            </span>
          ) : (
            ""
          )}
        </div>
        {promoted && originalPrice ? (
          <div className="font-darkgray text-linethrough text-weight-300 font-size-13">
            <span className="font-heebo">
              {currencySign}
              {originalPrice}
            </span>
            /<span className="font-heebo">{primaryQuantityUnit?.sellingUnit.name}</span>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

// StoreItem.whyDidYouRender = {
//   logOnDifferentValues: true,
//   customName: "Store",
// };

export default StoreItem;
