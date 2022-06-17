import {
  Avatar,
  Box,
  Chip,
  Divider,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import React from "react";
import { RepoItem } from "../store/features/repo/repoSlice";

const RepositoryList = ({ repoList }: { repoList: RepoItem[] }) => {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {repoList.map((item: RepoItem) => (
        <React.Fragment key={item.id}>
          <ListItem alignItems="flex-start" data-testid="test-repoitem">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={item.owner.avatar} />
            </ListItemAvatar>
            <Box>
              <Link
                href={`https://github.com/${item.fullname}`}
                underline="hover"
              >
                <Typography variant="h6">{item.fullname}</Typography>
              </Link>
              <Typography variant="body1">{item.description}</Typography>
              <Box sx={{ mb: 1 }}>
                {item.topics.map((topic: string) => (
                  <Chip
                    key={`${item.id}-topic-${topic}`}
                    label={topic}
                    sx={{ mr: 1, mt: 1 }}
                  />
                ))}
              </Box>
              <Box sx={{ display: "flex" }}>
                <Typography variant="body2" sx={{ mr: 2 }}>
                  {item.stars} stars
                </Typography>
                {item.language && (
                  <Typography variant="body2" sx={{ mr: 2 }}>
                    {item.language}
                  </Typography>
                )}
                {item.license && (
                  <Typography variant="body2" sx={{ mr: 2 }}>
                    {item.license}
                  </Typography>
                )}
              </Box>
            </Box>
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};
export default RepositoryList;
