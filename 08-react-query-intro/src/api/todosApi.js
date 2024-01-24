import axios from "axios";

const todosApi = axios.create({
  baseURL: "http://localhost:3500",
});
//CRUD operation
//Read
export const getTodos = async () => {
  const resp = await todosApi.get("/todos");
  return resp.data;
};
//Create
export const addTodo = async (todo) => {
  return await todosApi.post("/todos", todo);
};
//Update
export const updateTodo = async (todo) => {
  return await todosApi.patch(`/todos/${todo.id}`, todo);
};
//Delete
export const deleteTodo = async ({ id }) => {
  return await todosApi.delete(`/todos/${id}`, id);
};

export default todosApi;
