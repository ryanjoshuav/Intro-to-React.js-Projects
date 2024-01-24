import { useSelector } from "react-redux";
import { getPostsError, getPostsStatus, selectAllPosts } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsLists = () => {
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  let content;
  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => {
      return <PostsExcerpt post={post} key={post.id} />;
    });
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }
  return <section>{content}</section>;
};
export default PostsLists;
