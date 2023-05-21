const getUsers = (username, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/checkout/find/${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("PIPPO", data);
        dispatch({
          type: "GET_USER",
          payload: data,
        });
      } else {
        throw new Error("Errore, response non ok");
      }
    } catch (error) {
      console.log("Sono catch", error);
    }
  };
};

export default getUsers;
