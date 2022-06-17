import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../../types";

const repoSelector = (state: AppState) => state.repo;

export const repoListSelector = createSelector(
  repoSelector,
  (state) => state.repoList
);
export const repoCntSelector = createSelector(
  repoSelector,
  (state) => state.totalCnt
);
export const repoIsLoadSelector = createSelector(
  repoSelector,
  (state) => state.isLoading
);
export const repoErrorSelector = createSelector(
  repoSelector,
  (state) => state.error
);
