import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRepoData } from "./repoAPI";

interface Owner {
  name: string;
  avatar: string;
}

export interface RepoItem {
  id: string;
  name: string;
  fullname: string;
  stars: number;
  watchers: number;
  language: string;
  forks: number;
  owner: Owner;
  description: string;
  topics: string[];
  license?: string;
}

export type RepoState = {
  isLoading: boolean;
  repoList: RepoItem[];
  error: string | undefined;
  totalCnt: number;
};

const initialState: RepoState = {
  repoList: [],
  error: undefined,
  isLoading: false,
  totalCnt: 0,
};

export const searchReposAsync = createAsyncThunk(
  "repos/searchRepos",
  async ({
    repoKeyword,
    pageInd,
    perPage,
  }: {
    repoKeyword: string;
    pageInd: number;
    perPage: number;
  }) => {
    try {
      const repoData = await fetchRepoData(repoKeyword, pageInd, perPage);
      return repoData;
    } catch (err: any) {
      if (err.response) {
        throw new Error(err.response?.data.message);
      }
      throw err;
    }
  }
);

export const repoSlice = createSlice({
  name: "repo",
  initialState,
  /**
   * RTK uses Immer internally, so you can "mutate" the state as it's only a draft.
   * https://redux-toolkit.js.org/usage/immer-reducers#redux-toolkit-and-immer
   */
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchReposAsync.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(searchReposAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.repoList = action.payload.items.map(
          (item: any): RepoItem => ({
            id: item.id,
            name: item.name,
            fullname: item.full_name,
            stars: item.stargazers_count,
            watchers: item.watchers_count,
            language: item.language,
            forks: item.forks_count,
            owner: {
              name: item.owner.login,
              avatar: item.owner.avatar_url,
            },
            description: item.description,
            topics: item.topics,
            license: item?.license?.name,
          })
        );
        state.totalCnt = action.payload.total_count;
      })
      .addCase(searchReposAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        //console.log(action.error);
      });
  },
});

export const repoActions = repoSlice.actions;

export const repoReducer = repoSlice.reducer;
