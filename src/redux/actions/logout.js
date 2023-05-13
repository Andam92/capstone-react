// FUNZIONE DI LOGOUT

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: "LOGOUT",
    });
  };
};
