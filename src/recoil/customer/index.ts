import { atom, selector } from "recoil";
import { ICustomer } from "../type";

const defaultCustomer = [
  {
    id: new Date().getTime(),
    name: "John",
    age: 23,
    total: 100,
  },
];
//initialize customer
export const customerRecoil = atom<ICustomer[]>({
  key: "customer",
  default: defaultCustomer,
});

//actions selector
export const customerVip = selector<ICustomer[]>({
  key: "customerVip",
  get: ({ get }) => {
    const list = get(customerRecoil);
    return list.filter((item) => item.total > 500);
  },
});

export const customerNormal = selector<ICustomer[]>({
  key: "customerNormal",
  get: ({ get }) => {
    const list = get(customerRecoil);
    return list.filter((item) => item.total < 500);
  },
});
