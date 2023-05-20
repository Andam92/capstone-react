const initialState = {
  users: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER":
      return { ...state, users: action.payload };

    default:
      return state;
  }
};

export default usersReducer;
