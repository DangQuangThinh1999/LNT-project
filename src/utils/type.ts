export type IStatus = "process" | "wait" | "finish";

export type TBalanceTokenUser = {
  balance: number;
  symbol: string;
  tokenNam: string;
};
export type TTokens = {
  imageUrl: string;
  symbol: string;
  tokenID: string;
  tokenName: string;
  tokenAddress: string;
};
