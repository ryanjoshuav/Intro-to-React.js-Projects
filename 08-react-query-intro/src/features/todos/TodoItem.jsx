import { useMutation, useQueryClient } from "react-query";
import { deleteTodo, updateTodo } from "../../api/todosApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const TodoItem = ({ todo }) => {
  const queryClient = useQueryClient(); // got this from client attr from main.js's provider

  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      //invalidates the todo cache and refetch
      queryClient.invalidateQueries("todos");
    },
  });

  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      //invalidates the todo cache and refetch
      queryClient.invalidateQueries("todos");
    },
  });

  return (
    <article key={todo.id}>
      <div className="todo">
        <input
          type="checkbox"
          checked={todo.completed}
          id={todo.id}
          onChange={() =>
            updateTodoMutation.mutate({
              ...todo,
              completed: !todo.completed,
            })
          }
        />
        <label htmlFor={todo.id}>{todo.title}</label>
      </div>
      <button
        className="trash"
        onClick={() => deleteTodoMutation.mutate({ id: todo.id })}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </article>
  );
};

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.todo.id === nextProps.todo.id &&
    prevProps.todo.completed === nextProps.todo.completed
  );
};

const memoizedTodoItem = React.memo(TodoItem, areEqual);
export default memoizedTodoItem;
