// FUNZIONE DI LOGIN

export const authRequest = (formUsernameValue, formPswValue) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formUsernameValue,
          password: formPswValue,
        }),
      });

      if (response.ok) {
        const data = (await response).json();
        const value = await data.then((e) => e);
        dispatch({
          type: "ADD_TOKEN",
          payload: value,
        });
        //data.then((e) => console.log(e));
      } else {
        dispatch({
          type: "NOT_FOUND",
          payload: false,
        });
        console.log("Nessun utente trovato, effettua la registrazione");
      }
    } catch (error) {}
  };
};
