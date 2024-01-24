// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

// const USERS_URL = "https://jsonplaceholder.typicode.com/users";

// const initialState = [];

// export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
//   try {
//     const resp = await axios.get(USERS_URL);
//     return resp.data;
//   } catch (error) {
//     return error.message;
//   }
// });

// const userSlice = createSlice({
//   name: "users",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchUsers.fulfilled, (state, action) => {
//       return action.payload;
//     });
//   },
// });

const userAdapter = createEntityAdapter();
const initialState = userAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      transformResponse: (responseData) =>
        userAdapter.setAll(initialState, responseData),
      providesTags: (result, error, arg) => [
        { type: "User", id: "LIST" },
        ...result.ids.map((id) => ({ type: "User", id })),
      ],
    }),
  }),
});

export const { useGetUsersQuery } = userApiSlice;

// returns the query result object
const selectUsersResult = userApiSlice.endpoints.getUsers.select();

// Creates memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // Pass in a selector that returns the posts slice of state
} = userAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);

// export const selectAllUsers = (state) => state.users;

// export const selectUserById = (state, userId) => {
//   state.users.find((user) => user.id === userId);
// };

// export default userSlice.reducer;
