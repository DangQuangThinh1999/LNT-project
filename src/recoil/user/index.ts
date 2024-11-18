import { atom } from "recoil";
export interface TUser {
  email: string;
  name: string;
  userId: string;
  walletAddress: string;
}
const defaultUser = {
  token: localStorage.getItem("token") || "",
  user: {
    email: localStorage.getItem("email") || "",
    name: "",
    userId: "",
    walletAddress: localStorage.getItem("walletAddress") || "",
  } as TUser,
};
//initialize customer
export const userRecoil = atom({
  key: "userRecoil",
  default: defaultUser,
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        if (newValue.token.length === 0) {
          localStorage.removeItem("email");
          localStorage.removeItem("WalletAddress");
          return localStorage.removeItem("token");
        }
        localStorage.setItem("email", newValue.user.email);
        localStorage.setItem("walletAddress", newValue.user.walletAddress);
        localStorage.setItem("token", newValue.token);
      });
    },
  ],
});
