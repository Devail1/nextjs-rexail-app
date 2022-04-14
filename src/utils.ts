import { TCategory, TProduct } from "types";

export function calculateTotal(array: TProduct[]) {
  console.log("file: utils.ts ~ line 4 ~ calculateTotal ~ array", array);
  if (!array.length) return "0.00";
  const initialValue = 0;
  const sumWithInitial = array.reduce(
    (totalSum: number, product: TProduct) => totalSum + product.price * product.quantity!,
    initialValue
  );
  if (isNaN(sumWithInitial)) return "0.00";
  return sumWithInitial.toFixed(2);
}

export function formatData(array: object[]): TCategory[] {
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
