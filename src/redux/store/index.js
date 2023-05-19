import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import tokenReducer from "../reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import failedLogin from "../reducers/failedLogin";
import prodottiReducer from "../reducers/prodotti";
import wishReducer from "../reducers/whishlist";

// const store = configureStore({reducer: tokenReducer});

const rootReducer = combineReducers({
  authReducer: tokenReducer,
  failedLogin: failedLogin,
  prodotti: prodottiReducer,
  wishReducer: wishReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
