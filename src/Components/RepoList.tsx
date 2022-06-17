import { List } from "@mui/material";
import React from "react";
import { RepoItem } from "../store/features/repo/repoSlice";
import RepositoryItem from "./RepoItem";

const RepositoryList = ({ repoList }: { repoList: RepoItem[] }) => {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {repoList.map((item: RepoItem) => (
        <RepositoryItem key={item.id} repoItem={item} />
      ))}
    </List>
  );
};
export default RepositoryList;
