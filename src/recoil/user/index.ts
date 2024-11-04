import { atom } from "recoil";
interface TUser {
  email: string;
  Name: string;
  UserId: string;
  WalletAddress: string;
}
const defaultUser = {
  token: localStorage.getItem("token"),
  user: {} as TUser,
};
//initialize customer
export const userRecoil = atom({
  key: "user",
  default: defaultUser,
});
