enum MethodLogin {
  Gmail = "gmail",
  Mobile = "mobile",
}
enum MethodWallet {
  Overview = "Overview",
  BuyCrypto = "Buy Crypto",
  SellCrypto = "Sell Crypto",
}
export const methodWalletArray = Object.values(MethodWallet);

export const methodLoginArray = Object.values(MethodLogin);
