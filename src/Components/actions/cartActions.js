import { ADD_TO_CART, REMOVE_ITEM,SUB_QUANTITY, ADD_QUANTITY } from './action-types/cart-actions';

// add cart action
export const addToCart = (item) => ({
  type: ADD_TO_CART,
  addedItem: item,
});

// remove item action
export const removeItem = (id) => ({
  type: REMOVE_ITEM,
  id,
});

// subtract quantity action
export const subtractQuantity = (id) => ({
  type: SUB_QUANTITY,
  id,
});

// add quantity action
export const addQuantity = (id) => ({
  type: ADD_QUANTITY,
  id,
});
