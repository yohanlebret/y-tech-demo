import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY } from '../actions/action-types/cart-actions';


const initState = {
  addedItems: [],
  total: 0,
};

const cartReducer = (state = initState, action) => {

  // Add item to the cart and update total
  if (action.type === ADD_TO_CART) {
    const existedItem = state.addedItems.find((item) => action.addedItem.id === item.id);

    // Increase quantity if item already in the cart
    if (existedItem) {
      action.addedItem.quantity += 1;
      return {
        ...state,
        total: state.total + action.addedItem.abv,
      };
    }

    // Else set quantity to 1 and update total
    action.addedItem.quantity = 1;
    // calculating the total
    const newTotal = state.total + action.addedItem.abv;
    return {
      ...state,
      addedItems: [...state.addedItems, action.addedItem],
      total: Number(newTotal.toFixed(2)),
    };
  }

  // remove item to the cart and update total
  if (action.type === REMOVE_ITEM) {
    const itemToRemove = state.addedItems.find((item) => action.id === item.id);
    const newItems = state.addedItems.filter((item) => action.id !== item.id);

    // calculating the total
    const newTotal = state.total - (itemToRemove.abv * itemToRemove.quantity);
    return {
      ...state,
      addedItems: newItems,
      total: Number(newTotal.toFixed(2))
    };
  }

  // increase item quantity and update total
  if (action.type === ADD_QUANTITY) {
    let addedItem = state.addedItems.find((item)=> action.id === item.id);
    addedItem.quantity += 1;
    const newTotal = state.total + addedItem.abv;
    return {
      ...state,
      total: Number(newTotal.toFixed(2)),
    }
  }

  // decrease item quantity and update total
  if (action.type === SUB_QUANTITY) {
    let addedItem = state.addedItems.find((item) => action.id === item.id);
    if (addedItem.quantity === 1) {
      let newItems = state.addedItems.filter((item) => item.id !== action.id);
      let newTotal = state.total - addedItem.abv;
      return {
        ...state,
        addedItems: newItems,
        total: Number(newTotal.toFixed(2))
      };
    };
    addedItem.quantity -= 1;
    let newTotal = state.total - addedItem.abv;
    return {
      ...state,
      total: Number(newTotal.toFixed(2)),
    };
  };

  return state;
};

export default cartReducer;
