enum METHODS_LOGIN_ENUM {
  Gmail = "gmail",
  Mobile = "mobile",
}
enum METHODS_WALLET_ENUM {
  Overview = "Overview",
  BuyCrypto = "Buy Crypto",
  SellCrypto = "Sell Crypto",
  Transfer = "Transfer",
}

export const METHOD_WALLET_ARRAY = [
  METHODS_WALLET_ENUM.Overview,
  METHODS_WALLET_ENUM.BuyCrypto,
  METHODS_WALLET_ENUM.SellCrypto,
  METHODS_WALLET_ENUM.Transfer,
];

export const METHOD_LOGIN_ARRAY = [
  METHODS_LOGIN_ENUM.Gmail,
  METHODS_LOGIN_ENUM.Mobile,
];
