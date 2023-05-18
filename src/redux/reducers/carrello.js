const initialState = {
  carrello: [],
};

const carrelloReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const isDuplicate = state.carrello.some(
        (elemento) => elemento.id === action.payload.id
      );
      if (!isDuplicate) {
        return { ...state, carrello: [...state.carrello, action.payload] };
      } else {
        console.log("Elemento già presente nel carrello!");
      }
      return state;
    case "DELETE_FROM_CART":
      return {
        ...state,
        carrello: state.carrello.filter(
          (element) => element.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default carrelloReducer;
