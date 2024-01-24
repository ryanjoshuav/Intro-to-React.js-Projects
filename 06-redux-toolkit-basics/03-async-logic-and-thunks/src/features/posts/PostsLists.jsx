import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchPosts,
  getPostsError,
  getPostsStatus,
  selectAllPosts,
} from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsLists = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === "idle") dispatch(fetchPosts());
  }, [postsStatus]);

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
  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};
export default PostsLists;
