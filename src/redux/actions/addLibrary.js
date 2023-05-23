// RECUPERO LIBRERIA UTENTE
export const recuperaLibreria = (id, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:8080/library/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: "SAVE_LIBRARY",
          payload: data,
        });
        console.log("stefano e data", data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };
};
