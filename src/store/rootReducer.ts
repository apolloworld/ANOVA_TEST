import { AnyAction, combineReducers } from "@reduxjs/toolkit";

import { repoReducer } from "./features/repo/repoSlice";

const combinedReducer = combineReducers({
  repo: repoReducer,
});

export const rootReducer = (
  state: ReturnType<typeof combinedReducer> | undefined,
  action: AnyAction
) => {
  return combinedReducer(state, action);
};
