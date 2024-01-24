import AddPostForm from "./features/posts/AddPostForm";
import PostsLists from "./features/posts/PostsLists";

const App = () => {
  return (
    <main className="App">
      <AddPostForm />
      <PostsLists />
    </main>
  );
};
export default App;
