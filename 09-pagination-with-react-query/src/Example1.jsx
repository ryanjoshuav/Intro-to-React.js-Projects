import { useEffect, useState } from "react";
import { getPostPage } from "./api/axios";
import Post from "./Post";

const Example1 = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const postsPerPage = 10; // Adjust this based on your API response

  useEffect(() => {
    getPostPage(page).then((json) => setPosts(json));
  }, [page]);

  const content = posts.map((post) => <Post key={post.id} post={post} />);

  const nextPage = () => {
    const nextPageNumber = page + 1;
    getPostPage(nextPageNumber).then((json) => {
      if (json.length > 0) {
        setPage(nextPageNumber);
        setPosts(json);
      }
    });
  };

  const prevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

  const isLastPage = posts.length < postsPerPage;

  return (
    <>
      <nav>
        <button onClick={prevPage} disabled={page === 1}>
          Prev Page
        </button>
        <button onClick={nextPage} disabled={isLastPage}>
          Next Page
        </button>
      </nav>
      {content}
    </>
  );
};

export default Example1;
