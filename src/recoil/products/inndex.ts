import { atom, selectorFamily } from "recoil";
//initialize product
export const productsRecoil = atom({
  key: "products",
  default: [],
});
//actions selectorFamily
export const productData = selectorFamily({
  key: "productsData",
  get: (id?: string) => () => async () => {
    const url = `https://fakestoreapi.com/products${id ? "/" + id : ""}`;
    const getData = async () => {
      const response = await fetch(url);
      return response.json();
    };

    const products = await getData();

    return products;
  },
});
