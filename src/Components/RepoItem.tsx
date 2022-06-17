import React from "react";
import { RepoItem } from "../store/features/repo/repoSlice";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Link,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@mui/material";
const RepositoryItem = ({ repoItem }: { repoItem: RepoItem }) => {
  return (
    <React.Fragment>
      <ListItem alignItems="flex-start" data-testid="test-repoitem">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={repoItem.owner.avatar} />
        </ListItemAvatar>
        <Box>
          <Link
            href={`https://github.com/${repoItem.fullname}`}
            underline="hover"
          >
            <Typography variant="h6">{repoItem.fullname}</Typography>
          </Link>
          <Typography variant="body1">{repoItem.description}</Typography>
          <Box sx={{ mb: 1 }}>
            {repoItem.topics.map((topic: string) => (
              <Chip
                key={`${repoItem.id}-topic-${topic}`}
                label={topic}
                sx={{ mr: 1, mt: 1 }}
              />
            ))}
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography variant="body2" sx={{ mr: 2 }}>
              {repoItem.stars} stars
            </Typography>
            {repoItem.language && (
              <Typography variant="body2" sx={{ mr: 2 }}>
                {repoItem.language}
              </Typography>
            )}
            {repoItem.license && (
              <Typography variant="body2" sx={{ mr: 2 }}>
                {repoItem.license}
              </Typography>
            )}
          </Box>
        </Box>
      </ListItem>
      <Divider variant="inset" component="li" />
    </React.Fragment>
  );
};
export default RepositoryItem;
