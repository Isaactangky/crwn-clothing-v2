import { applyMiddleware, compose, createStore } from "redux";
import { logger } from "redux-logger";
import { rootReducer } from "./root-reducer";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";

// root reducers
const middleWares = [
  process.env.NODE_ENV === "development" && logger,
  thunk,
].filter(Boolean);
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
