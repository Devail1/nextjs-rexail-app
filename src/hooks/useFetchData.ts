import { useState, useEffect } from "react";
import { TCategory, TProduct } from "types";

export const useFetchData = () => {
  const [appData, setAppData] = useState<{ storeData: object; productsData: TCategory[] }>({
    storeData: {},
    productsData: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    // Call an external API endpoint to get store data.
    const res1 = await fetch(
      "https://test.rexail.co.il/client/public/store/website?domain=testeitan.rexail.co.il"
    );
    const response1 = await res1.json();
    const storeData = response1.data;

    // Call an external API endpoint to get products data with json web token.
    const res2 = await fetch(
      `https://test.rexail.co.il/client/public/store/catalog?s_jwe=${storeData.jsonWebEncryption}`
    );
    const response2 = await res2.json();
    const productsData = formatData(response2.data);

    function formatData(array: object[]): TCategory[] {
      const IMG_BASE_URL = "https://s3.eu-central-1.amazonaws.com/images-il.rexail.com/";

      return Object.values(
        array.reduce(
          (obj: any, current: any) => {
            if (!obj[current.productCategory.id]) {
              obj[current.productCategory.id] = {
                id: current.productCategory.id,
                name: current.productCategory.name,
                children: [],
              };
            }

            let productModel: TProduct = {
              id: current.id,
              name: current.product.name,
              fullName: current.fullName,
              imageUrl: IMG_BASE_URL.concat(current.imageUrl),
              price: current.price,
              promoted: current.promoted,
              originalPrice: current.originalPrice,
              productQuality: current.productQuality,
              currentRelevancy: current.currentRelevancy,
              // If there is no primary quantity unit than use the first product selling unit.
              primaryQuantityUnit: current.primaryQuantityUnit
                ? current.primaryQuantityUnit
                : current.productSellingUnits[0],
              productSellingUnits: current.productSellingUnits,
              commentType: current.commentType,
            };

            // Push to all products category
            if (current.product.id) obj["0"].children.push(productModel);
            // Push to promoted products category
            if (current.promoted) obj["1"].children.push(productModel);

            // Continue reformatting
            obj[current.productCategory.id].children.push(productModel);

            return obj;
          },
          {
            // Initial state manually with default categories
            0: { id: 0, name: "כל המוצרים", children: [] },
            1: { id: 1, name: "מבצעים", children: [] },
          }
        )
      );
    }
    setAppData({ storeData, productsData });
  }

  return appData;
};
