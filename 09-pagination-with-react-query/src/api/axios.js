import axios from "axios";

export const axiosOne = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPostPage = async (pageParam = 1) => {
  const resp = await axiosOne.get(`/posts?_page=${pageParam}`);
  return resp.data;
};

export const axiosTwo = axios.create({
  baseURL: "https://reqres.in/api",
});

export const getUserPage = async (pageParam = 1) => {
  const resp = await axiosTwo.get(`/users?page=${pageParam}`);
  return resp.data;
};
