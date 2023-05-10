import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../reducers";

const store = configureStore({reducer: tokenReducer});

export default store;
