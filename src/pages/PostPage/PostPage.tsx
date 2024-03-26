import { TRootState } from "../../store";
import Post from "../../features/Post";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IPost, getPostById } from "../../features/Posts/postsSlice";

const PostPage = () => {
  const { postId = "" } = useParams();
  const post =
    useSelector((state: TRootState) => getPostById(state, Number(postId))) ||
    ({} as IPost);
  console.log(post, postId);
  return (
    <>
      <Post {...post} />
    </>
  );
};

export default PostPage;
