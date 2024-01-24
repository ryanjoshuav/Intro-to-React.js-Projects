import { useEffect } from "react";
import { useState } from "react";
import { getPost } from "./api/axios";
import SearchBar from "./SearchBar";
import ListPage from "./ListPage";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getPost()
      .then((json) => {
        setPosts(json);
        return json;
      })
      .then((json) => {
        setSearchResults(json);
      });
  }, []);
  return (
    <>
      <SearchBar posts={posts} setSearchResults={setSearchResults} />
      <ListPage searchResults={searchResults} />
    </>
  );
};
export default App;
