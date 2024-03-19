import { Box, Stack, Typography } from "@mui/material";
import Post from "../Post";
import { useSelector } from "react-redux";
import { postsSelector } from "./postsSlice";
import CreatePost from "../CreatePost";

const Posts = () => {
  const posts = useSelector(postsSelector);
  return (
    <Box flex={4} p={2}>
      <Stack direction="column" spacing={3}>
        <CreatePost />
        <Typography variant="h3" fontWeight="700">
          Existing posts
        </Typography>
        {posts.map((post) => {
          return <Post key={post.id} {...post} />;
        })}
      </Stack>
    </Box>
  );
};

export default Posts;
