import {
  configureStore,
  ConfigureStoreOptions,
  Middleware,
} from "@reduxjs/toolkit";
//import logger from "redux-logger";
import { rootReducer } from "./rootReducer";
import { thunkExtraArgument } from "./thunkExtraArgument";

const middlewares: Middleware[] = [];

export const initStore = (
  storeOptions?: Omit<ConfigureStoreOptions, "reducer">
) => {
  return configureStore({
    ...storeOptions,
    devTools: true,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: thunkExtraArgument,
        },
        serializableCheck: false,
      }).concat(...middlewares),
  });
};

export const store = initStore();
