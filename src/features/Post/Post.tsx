import { Badge, IconButton, Stack, Typography } from "@mui/material";
import PostCard from "../PostCard";
import {
  ThumbUp,
  ThumbDown,
  Favorite,
  Mood,
  MoodBad,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { IPost, addReaction } from "../Posts/postsSlice";

const reactionsMap: { [key: string]: any } = {
  like: <ThumbUp color="primary" />,
  dislike: <ThumbDown color="primary" />,
  love: <Favorite color="error" />,
  laugh: <Mood color="warning" />,
  sad: <MoodBad color="warning" />,
};

const Post = ({ title, id, description, reactions }: IPost) => {
  const dispatch = useDispatch();
  const reactToPost = (reaction: string) => {
    dispatch(addReaction({ postId: id, reaction }));
  };
  return (
    <PostCard variant="outlined" sx={{ padding: "12px" }}>
      <Stack direction="column" spacing={1}>
        <Typography variant="h5" fontWeight="700">
          {title}
        </Typography>
        <Typography variant="body1">{description}</Typography>
        <Stack pt={2} direction="row">
          {Object.entries(reactions).map(([reaction, count]) => {
            return (
              <IconButton onClick={() => reactToPost(reaction)}>
                <Badge badgeContent={count.toString()} color="error">
                  {reactionsMap[reaction]}
                </Badge>
              </IconButton>
            );
          })}
        </Stack>
      </Stack>
    </PostCard>
  );
};

export default Post;
