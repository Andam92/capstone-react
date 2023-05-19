const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      //   const isDuplicate = state.wish.some(
      //     (elemento) => elemento.id === action.payload.id
      //   );

      return { ...state, cart: action.payload };

    default:
      return state;
  }
};

export default cartReducer;
