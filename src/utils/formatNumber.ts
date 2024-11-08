export const formatNumber = (text: string) => {
  const value = parseFloat(text);
  if (value < 1) {
    if (value < 0.0001) {
      return value.toFixed(7);
    }
    return value.toFixed(4);
  }
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
