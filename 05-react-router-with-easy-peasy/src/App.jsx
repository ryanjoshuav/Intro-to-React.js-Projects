import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useEffect } from "react";
import { useStoreActions } from "easy-peasy";

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const url = "http://localhost:3500/posts";
  const { data, fetchError, isLoading } = useAxiosFetch(url);

  useEffect(() => {
    setPosts(data);
  }, [data, setPosts]);
  
  return (
    <div className="App">
      <Header title="React JS Blog" />

      <Nav />
      <Routes>
        <Route path="/">
          <Route
            index
            element={<Home isLoading={isLoading} fetchError={fetchError} />}
          />
          <Route path="post">
            <Route index element={<NewPost />} />

            <Route path=":id" element={<PostPage />} />
          </Route>
          <Route path="edit/:id" element={<EditPost />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
