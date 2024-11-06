import { atom } from "recoil";
export interface TUser {
  email: string;
  Name: string;
  UserId: string;
  WalletAddress: string;
}
const defaultUser = {
  token: localStorage.getItem("token") || "",
  user: {} as TUser,
};
//initialize customer
export const userRecoil = atom({
  key: "userRecoil",
  default: defaultUser,
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        if (newValue.token.length === 0) {
          console.log("ok đã logout");
          return localStorage.removeItem("token");
        }
        localStorage.setItem("token", newValue.token);
      });
    },
  ],
});
