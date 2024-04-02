import {
  Favorite,
  Mood,
  MoodBad,
  ThumbDown,
  ThumbUp,
  AddReactionOutlined,
} from "@mui/icons-material";
import { Badge, IconButton, Stack } from "@mui/material";
import { IReactions, addReaction } from "../Posts/postsSlice";
import { useAppDispatch } from "../../customHooks";
import { useState } from "react";

type Props = {
  reactions: IReactions;
  postId: Number;
};
const reactionsMap: { [key: string]: any } = {
  like: <ThumbUp color="primary" />,
  dislike: <ThumbDown color="primary" />,
  love: <Favorite color="error" />,
  laugh: <Mood color="warning" />,
  sad: <MoodBad color="warning" />,
};

const Reactions = ({ reactions, postId }: Props) => {
  const [expandReactions, setExpandReactions] = useState(false);
  const dispatch = useAppDispatch();
  const reactToPost = (reaction: string) => {
    dispatch(addReaction({ postId, reaction }));
  };
  return (
    <Stack pt={2} direction="row">
      <IconButton
        color="warning"
        onClick={() => setExpandReactions((expanded) => !expanded)}
      >
        <AddReactionOutlined />
      </IconButton>
      {expandReactions &&
        Object.entries(reactions).map(([reaction, count]) => {
          return (
            <IconButton key={reaction} onClick={() => reactToPost(reaction)}>
              <Badge badgeContent={count.toString()} color="error">
                {reactionsMap[reaction]}
              </Badge>
            </IconButton>
          );
        })}
    </Stack>
  );
};

export default Reactions;
