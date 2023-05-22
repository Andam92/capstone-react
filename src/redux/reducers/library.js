const initialState = {
  library: [],
};

export const libraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_LIBRARY":
      return { ...state, library: [...state.library, action.payload] };

    default:
      return state;
  }
};
