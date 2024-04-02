import { Link, Stack, Typography } from "@mui/material";
import PostCard from "../PostCard";
import { useSelector } from "react-redux";
import { IPost, getPostById } from "../Posts/postsSlice";
import { useState } from "react";
import { formatDistance } from "date-fns";
import { TRootState } from "../../store";
import Reactions from "../Reactions";

const Post = ({ id }: { id: Number }) => {
  const {
    title = "",
    body = "",
    reactions = {},
    date = "",
  } = useSelector((state: TRootState) => getPostById(state, id)) as IPost;
  const [description, setDescription] = useState(body?.substring(0, 300) || "");
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
        <Reactions reactions={reactions} postId={id} />
      </Stack>
    </PostCard>
  );
};

export default Post;
