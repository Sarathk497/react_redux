import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com";

// Async Thunks
export const fetchPosts = createAsyncThunk("data/fetchPosts", async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
});

export const fetchUsers = createAsyncThunk("data/fetchUsers", async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
});

// Slice
const dataSlice = createSlice({
  name: "data",
  initialState: {
    posts: [],
    users: [],
    searchQuery: "",
    selectedUserId: null,
    status: "idle", // idle | loading | succeeded | failed
  },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setSelectedUserId(state, action) {
      state.selectedUserId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export const { setSearchQuery, setSelectedUserId } = dataSlice.actions;

export default dataSlice.reducer;
