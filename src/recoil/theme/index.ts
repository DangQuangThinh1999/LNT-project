import { atom } from "recoil";
import { ETheme } from "../type";

const defaultTheme = ETheme.Light;
//initialize theme
export const themeRecoil = atom<ETheme>({
  key: "theme",
  default: defaultTheme,
});
