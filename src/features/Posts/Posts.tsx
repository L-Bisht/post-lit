import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Stack, Typography } from "@mui/material";
import {
  fetchPosts,
  postsSelector,
  getPostsStatus,
  getPostsError,
  // getPostsError,
} from "./postsSlice";
import { useAppDispatch } from "../../customHooks";
import Post from "../Post";
import withLoader from "../withLoader";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useSelector(postsSelector);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  const navigate = useNavigate();

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  const PostList = () => (
    <>
      {posts.map((post) => {
        return <Post key={post.id.toString()} id={post.id} />;
      })}
    </>
  );
  return (
    <>
      <Stack direction="column" spacing={3}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4" fontWeight="700">
            Posts
          </Typography>
          <Button
            variant="contained"
            sx={{ borderRadius: "24px" }}
            onClick={() => navigate("post")}
          >
            new post
          </Button>
        </Stack>
        {withLoader(<PostList />, postsStatus, postsError)}
      </Stack>
    </>
  );
};

export default Posts;
