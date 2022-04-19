import { TCategory, TProduct } from "types";
import type { GetStaticProps, NextPage } from "next";

import { useEffect, useCallback, useState } from "react";
import useMediaQuery from "hooks/useMediaQuery";

import Head from "next/head";

import { useDispatch, useSelector } from "react-redux";

import { ReactWindowScroller } from "react-window-scroller";
import { FixedSizeGrid as Grid } from "react-window";

import StoreItem from "components/StoreItem";
import List from "components/List";
import SideCart from "components/SideCart";

const Store: NextPage = () => {
  const {
    search: searchQuery,
    products: productsCatalog,
    config: { currencySign },
  } = useSelector((state: any) => state);

  const dispatch = useDispatch();

  const lg = useMediaQuery("(max-width: 1270px)");
  const md = useMediaQuery("(max-width: 1024px)");

  const [selectedCategory, setSelectedCategory] = useState<TCategory>({} as TCategory);

  const [minimizeSideCart, setMinimizeSideCart] = useState(false);
  const [gridColumnCount, setGridColumnCount] = useState(4);
  const [gridColumnWidth, setGridColumnWidth] = useState(208);
  const [selectedSortBy, setSelectedSortBy] = useState<string>("");
  const [isSortDropdownToggled, setIsSortDropdownToggled] = useState(false);

  useEffect(() => {
    if (productsCatalog) {
      setSelectedCategory(productsCatalog[0]);
    }
  }, [productsCatalog]);

  useEffect(() => {
    if (minimizeSideCart) {
      setTimeout(() => {
        setGridColumnCount((prev) => prev + 1);
        setGridColumnWidth(230);
      }, 600);
    } else {
      setGridColumnCount((prev) => prev - 1);
      setGridColumnWidth(208);
    }
  }, [minimizeSideCart]);

  useEffect(() => {
    if (lg) {
      setGridColumnCount(3);
      if (md) setGridColumnCount(2);
    } else setGridColumnCount(4);
  }, [lg, md]);

  useEffect(() => {
    let debounce = setTimeout(() => {
      if (selectedCategory?.children) {
        let currentCategory = productsCatalog.filter(
          (category: TCategory) => category.id === selectedCategory.id
        )[0];
        if (searchQuery.length >= 3) {
          setSelectedCategory({
            ...selectedCategory,
            children: currentCategory.children?.filter((product: TProduct) =>
              product.fullName.includes(searchQuery)
            ),
          });
        } else {
          setSelectedCategory(currentCategory);
        }
      }
    }, 800);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const handleCategoryClick = useCallback(
    (item: TCategory) => {
      setSelectedCategory(item);

      // If search input and sortBy values exists; set initial state
      if (searchQuery) dispatch({ type: "searchQuery/setSearchQuery", payload: "" });
      if (selectedSortBy) setSelectedSortBy("");
    },
    [selectedCategory]
  );

  const handleSortByClick = useCallback(
    (value: string) => {
      let sorted;

      if (value === "שם מוצר")
        sorted = selectedCategory?.children?.sort((a, b) => (a.fullName > b.fullName ? 1 : -1)) as TProduct[];
      if (value === "מחיר מהנמוך לגבוה")
        sorted = selectedCategory?.children?.sort((a, b) => (a.price > b.price ? 1 : -1)) as TProduct[];
      if (value === "מחיר מהגבוהה לנמוך")
        sorted = selectedCategory?.children?.sort((a, b) => (a.price < b.price ? 1 : -1)) as TProduct[];
      if (value === "מוצרים במבצע")
        sorted = selectedCategory?.children?.sort((a, b) => (a.promoted < b.promoted ? 1 : -1)) as TProduct[];

      setSelectedCategory({
        ...selectedCategory,
        children: sorted,
      });
      setSelectedSortBy(value);
    },
    [selectedCategory?.children]
  );

  const Cell = useCallback(
    ({ style, rowIndex, columnIndex, columnCount = 4 }) => {
      const item =
        selectedCategory.children && selectedCategory.children[rowIndex * columnCount + columnIndex];

      return (
        <div style={style}>
          {item ? (
            <StoreItem
              key={item.id}
              currencySign={currencySign}
              product={item}
              gridColumnWidth={gridColumnWidth}
            />
          ) : (
            ""
          )}
        </div>
      );
    },
    [selectedCategory?.children, gridColumnWidth]
  );

  return (
    <div className="pb-73">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/public/images/favicon.ico" />
      </Head>
      <nav id="categories" className="categories-wrapper">
        <ul className="container mx-auto h-full display-flex align-center justify-evenly font-gray-900">
          <List<TCategory>
            items={productsCatalog?.slice(0, 10)}
            renderItem={(item) => (
              <li
                key={item.id}
                className={selectedCategory?.id === item.id ? "category selected" : "category"}
              >
                <button type="button" onClick={() => handleCategoryClick(item)}>
                  {item.name}&nbsp;
                </button>
              </li>
            )}
          />
          {productsCatalog.length > 10 ? (
            <ul className="category show-more-categories">
              <span>עוד</span>
              <ul className="categories-show-more display-flex flex-vertical absolute pt-10 rounded-10">
                <List<TCategory>
                  items={productsCatalog?.slice(10, productsCatalog.length)}
                  renderItem={(item) => (
                    <li key={item.id} className="category show-more">
                      <button type="button" onClick={() => handleCategoryClick(item)}>
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
          <div className="store-widget-wrapper display-flex flex-vertical ">
            <div className="display-flex justify-between align-center">
              <h1 className="font-heebo font-blue">{selectedCategory?.name}</h1>
              <button
                type="button"
                className={
                  selectedSortBy && isSortDropdownToggled
                    ? "dropdown-active selected-sort sort-items c-p display-flex justify-between relative"
                    : selectedSortBy
                    ? "selected-sort sort-items c-p display-flex justify-between relative"
                    : isSortDropdownToggled
                    ? "dropdown-active sort-items c-p display-flex justify-between relative"
                    : "sort-items c-p display-flex justify-between relative"
                }
                onClick={() => setIsSortDropdownToggled(!isSortDropdownToggled)}
              >
                <span className="font-blue">{selectedSortBy ? selectedSortBy : "מיין לפי"}</span>
                <svg className="icon-arrow-down" viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.5 6.746 1.341 2.587a.786.786 0 0 0-1.11 1.111l4.713 4.715a.786.786 0 0 0 1.112 0l4.714-4.715a.786.786 0 0 0-1.111-1.11L5.5 6.745z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>

                {isSortDropdownToggled ? (
                  <ul className="dropdown-menu absolute mt-30">
                    <li className="dropdown-item" onClick={() => handleSortByClick("שם מוצר")}>
                      <a>שם מוצר</a>
                    </li>
                    <li className="dropdown-item" onClick={() => handleSortByClick("מחיר מהנמוך לגבוה")}>
                      <a>מחיר מהנמוך לגבוה </a>
                    </li>
                    <li className="dropdown-item" onClick={() => handleSortByClick("מחיר מהגבוהה לנמוך")}>
                      <a>מחיר מהגבוהה לנמוך </a>
                    </li>
                    <li className="dropdown-item" onClick={() => handleSortByClick("מוצרים במבצע")}>
                      <a>מוצרים במבצע</a>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </button>
            </div>
            <div className="store-widget">
              <div className="mt-30 h-full">
                {selectedCategory?.children?.length ? (
                  <ReactWindowScroller isGrid>
                    {({ ref, outerRef, style, onScroll }: any) => {
                      return (
                        <Grid
                          ref={ref}
                          style={style}
                          outerRef={outerRef}
                          onScroll={onScroll}
                          className="overflow-visible"
                          direction="rtl"
                          columnCount={gridColumnCount}
                          columnWidth={minimizeSideCart ? 248 : 220}
                          rowHeight={315}
                          height={window.innerHeight}
                          width={window.innerWidth}
                          rowCount={Math.ceil(selectedCategory.children!.length / 4)}
                        >
                          {Cell}
                        </Grid>
                      );
                    }}
                  </ReactWindowScroller>
                ) : (
                  ""
                )}
                {searchQuery && !selectedCategory?.children?.length ? (
                  <div className="font-blue font-heebo text-weight-600 font-size-22 no-wrap">
                    לא נמצאו תוצאות לחיפוש
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <SideCart minimizeSideCart={minimizeSideCart} setMinimizeSideCart={setMinimizeSideCart} />
        </div>
      </div>
    </div>
  );
};

export default Store;

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};
