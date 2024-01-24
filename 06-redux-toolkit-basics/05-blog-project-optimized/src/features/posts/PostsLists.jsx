import { useSelector } from "react-redux";
import { getPostsError, getPostsStatus, selectPostIds } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  const orderedPosts = useSelector(selectPostIds);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  let content;
  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === "succeeded") {
    content = orderedPosts.map((postId) => {
      return <PostsExcerpt postId={postId} key={postId} />;
    });
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }
  return <section>{content}</section>;
};
export default PostsList;
