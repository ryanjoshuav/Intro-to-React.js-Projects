import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addTodo, getTodos } from "../../api/todosApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const queryClient = useQueryClient(); // got this from client attr from main.js's provider

  const {
    isLoading,
    isError,
    error,
    data: todos,
  } = useQuery("todos", getTodos, {
    select: (data) => data.sort((a, b) => b.id - a.id), // to sort from latest to oldest
  });

  const addTodoMutation = useMutation(addTodo, {
    onSuccess: () => {
      //invalidates the todo cache and refetch
      queryClient.invalidateQueries("todos");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodoMutation.mutate({ userId: 1, title: newTodo, completed: false });
    setNewTodo("");
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>

      <div className="new-todo">
        <input
          type="text"
          name="new-todo"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
      </div>

      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>{error.message}</p>;
  } else {
    content = todos.map((todo) => <TodoItem key={todo.id} todo={todo} />);
  }

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};
export default TodoList;
