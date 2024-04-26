// formatPrice.js
export const formatPrice = (price) => {
  return price.toLocaleString("sv-SE", {
    style: "currency",
    currency: "SEK",
    minimumFractionDigits: 2,
  });
};
