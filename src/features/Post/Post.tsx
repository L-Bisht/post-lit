import { Badge, IconButton, Link, Stack, Typography } from "@mui/material";
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
import { useState } from "react";
import { formatDistance } from "date-fns";

const reactionsMap: { [key: string]: any } = {
  like: <ThumbUp color="primary" />,
  dislike: <ThumbDown color="primary" />,
  love: <Favorite color="error" />,
  laugh: <Mood color="warning" />,
  sad: <MoodBad color="warning" />,
};

const Post = ({ title, id, body, reactions, date }: IPost) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState(body?.substring(0, 300) || "");
  const reactToPost = (reaction: string) => {
    dispatch(addReaction({ postId: id, reaction }));
  };
  return (
    <PostCard variant="outlined" sx={{ padding: "12px" }}>
      <Stack direction="column" spacing={1}>
        <Typography variant="h5" fontWeight="700">
          {title}
        </Typography>
        <Typography variant="body1">
          {description}{" "}
          {body.length > 300 && (
            <Link
              onClick={() =>
                setDescription(
                  body === description ? body.substring(0, 300) : body
                )
              }
            >
              {body === description ? "Read less" : "Read more"}
            </Link>
          )}
        </Typography>

        <Typography variant="body2">
          {formatDistance(date, new Date(), { addSuffix: true })}
        </Typography>

        <Stack pt={2} direction="row">
          {Object.entries(reactions).map(([reaction, count]) => {
            return (
              <IconButton key={reaction} onClick={() => reactToPost(reaction)}>
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
