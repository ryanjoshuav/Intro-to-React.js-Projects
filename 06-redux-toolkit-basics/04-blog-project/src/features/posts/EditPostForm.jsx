import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, selectPostById, updatePost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useState } from "react";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    );
  }

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);
  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        await dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${post.id}`);
      } catch (error) {
        console.error(`Failed to save the post: ${error}`);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const onDeletePostClicked = async () => {
    try {
      setRequestStatus("pending");
      await dispatch(
        deletePost({
          id: post.id,
        })
      ).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate(`/`);
    } catch (error) {
      console.log(`Failed to delete post: ${error}`);
    } finally {
      setRequestStatus("idle");
    }
  };

  const userOptions = users.map((user) => (
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          value={title}
          name="postTitle"
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          name="postAuthor"
          id="postAuthor"
          defaultValue={userId}
          onChange={onAuthorChanged}
        >
          <option value=""></option>
          {userOptions}
        </select>

        <label htmlFor="postContent">Content:</label>
        <input
          type="text"
          id="postContent"
          value={content}
          name="postContent"
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
        <button
          className="deleteButton"
          type="button"
          onClick={onDeletePostClicked}
        >
          Delete
        </button>
      </form>
    </section>
  );
};
export default EditPostForm;
