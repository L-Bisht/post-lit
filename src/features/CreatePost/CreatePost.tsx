import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import PostCard from "../PostCard";
import { FormEvent, useState } from "react";
import { addNewPost } from "../Posts/postsSlice";
import { useAppDispatch } from "../../customHooks";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handlePostSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!(title && description)) {
      return;
    }
    try {
      dispatch(addNewPost({ title, body: description })).unwrap();
      navigate("/post/123");
    } catch (err) {
      console.log("Error", err);
    }
  };
  return (
    <PostCard variant="outlined">
      <form onSubmit={handlePostSubmit}>
        <Stack alignItems="center" direction="column" spacing={2}>
          <Typography variant="h4" fontWeight="700">
            Create new post
          </Typography>
          <TextField
            label="Title"
            fullWidth
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Descripton"
            multiline
            type="text"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Box>
            <Button
              type="submit"
              fullWidth={false}
              variant="outlined"
              color="primary"
            >
              Post
            </Button>
          </Box>
        </Stack>
      </form>
    </PostCard>
  );
};

export default CreatePost;
