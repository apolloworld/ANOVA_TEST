import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { initStore } from "./initStore";
import { thunkExtraArgument } from "./thunkExtraArgument";

type Store = ReturnType<typeof initStore>;

export type AppDispatch = Store["dispatch"];

export type AppState = ReturnType<Store["getState"]>;

/**
 * This type might by useful in some cases where we do want to use `createAsyncThunk` generics (to keep TS inference),
 * but rather cast the `thunkAPI` object
 */
export type AppThunkAPI<RejectedValue = unknown> = BaseThunkAPI<
  AppState,
  typeof thunkExtraArgument,
  AppDispatch,
  RejectedValue
>;

/**
 * This type might be useful for the 3rd generic of `createAsyncThunk<ReturnedValue, ThunkArg, AppThunkConfig>`
 *
 * The default type `AsyncThunkConfig` is not exported from the library, so we cannot extend it and have to copy it in our codebase
 * https://github.com/reduxjs/redux-toolkit/blob/db0d7dc20939b62f8c59631cc030575b78642296/packages/toolkit/src/createAsyncThunk.ts#L109-L118
 */
export type AppThunkConfig<RejectedValue = unknown> = {
  state: AppState;
  dispatch: AppDispatch;
  extra: typeof thunkExtraArgument;
  rejectValue: RejectedValue;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};
