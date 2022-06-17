import {
  Box,
  Button,
  CircularProgress,
  Container,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import RepositoryList from "./Components/RepoList";
import {
  repoListSelector,
  repoIsLoadSelector,
  repoErrorSelector,
  repoCntSelector,
} from "./store/features/repo/repoSelector";
import { searchReposAsync } from "./store/features/repo/repoSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const repoList = useAppSelector((state) => repoListSelector(state));
  const isLoading = useAppSelector((state) => repoIsLoadSelector(state));
  const fetchError = useAppSelector((state) => repoErrorSelector(state));
  const totalCnt = useAppSelector((state) => repoCntSelector(state));
  const [perPage, setPerPage] = useState<number>(10);
  const [curPage, setCurPage] = useState<number>(1);
  const [repoKeyword, setRepoKeyword] = useState<string>("");
  const [curRepoKeyword, setCurRepoKeyword] = useState<string>("");

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurPage(value);
  };

  useEffect(() => {
    if (curRepoKeyword !== "") {
      dispatch(
        searchReposAsync({
          repoKeyword: curRepoKeyword,
          pageInd: curPage,
          perPage: perPage,
        })
      );
    }
  }, [curPage, curRepoKeyword]);

  const handleChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepoKeyword(event.target.value);
  };

  const handleClickSearch = () => {
    setCurRepoKeyword(repoKeyword);
    setCurPage(1);
  };

  return (
    <Container sx={{ py: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search Keyword"
          value={repoKeyword}
          onChange={handleChangeKeyword}
          size="small"
        />
        <Button
          variant="contained"
          sx={{ ml: 2 }}
          onClick={handleClickSearch}
          disabled={isLoading}
        >
          Search
        </Button>
      </Box>
      <Box
        sx={{
          width: "100%",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              height: 200,
              alignItems: "center",
              display: "flex",
            }}
          >
            <CircularProgress
              color="primary"
              data-testid="test-circle-progress"
            />
          </Box>
        ) : fetchError ? (
          <Box
            sx={{
              height: 200,
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography variant="h5">{fetchError}</Typography>
          </Box>
        ) : (
          <RepositoryList repoList={repoList} />
        )}
        {!isLoading && totalCnt === 0 ? (
          <Box
            sx={{
              height: 200,
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography variant="h5">
              {curRepoKeyword !== ""
                ? "No Repository"
                : "Search Github Repositories by Name"}
            </Typography>
          </Box>
        ) : (
          <Pagination
            count={Math.ceil(totalCnt / perPage)}
            color="primary"
            boundaryCount={2}
            page={curPage}
            onChange={handleChangePage}
            disabled={isLoading}
            data-testid="test-pagination"
          />
        )}
      </Box>
    </Container>
  );
};

export default App;
