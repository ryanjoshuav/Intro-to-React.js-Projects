import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectUserById } from "./usersSlice";
import { selectAllPosts, selectPostByUser } from "../posts/postsSlice";

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  // const postsForUser = useSelector((state) => {
  //   const allPosts = selectAllPosts(state);
  //   return allPosts.filter((post) => post.userId === Number(userId));
  // });

  //* memoize posts method 1
  // const allPosts = useSelector(selectAllPosts);
  // const postsForUser = useMemo(() => {
  //   return allPosts.filter((post) => post.userId === Number(userId));
  // }, [allPosts, userId]);

  //* memoize posts method 2 - using selectPostByUser
  const postsForUser = useSelector((state) =>
    selectPostByUser(state, Number(userId))
  );

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}> {post.title} </Link>
    </li>
  ));

  return (
    <section>
      <h2>{user?.name}</h2>

      <ol>{postTitles}</ol>
    </section>
  );
};
export default UserPage;
