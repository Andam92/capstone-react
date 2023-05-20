const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // return { ...state, cart: [...state.cart, action.payload] };
      return { ...state, cart: [...state.cart, action.payload] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.filter((element) => action.payload.id !== element.id),
      };
    default:
      return state;
  }
};

export default cartReducer;
