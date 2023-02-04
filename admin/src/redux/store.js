import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import productReducer from "./productRedux";
import customerRedux from "./customerRedux";
import listRedux from "./listRedux";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import ordersRedux from "./ordersRedux";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["orders"],
};
const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
  customers: customerRedux,
  lists: listRedux,
  orders: ordersRedux,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
