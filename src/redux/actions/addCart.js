// AGGIUNGI AL CARRELLO

export const addToCart = (prodotto) => {
  return { type: "ADD_TO_CART", payload: prodotto };
};
