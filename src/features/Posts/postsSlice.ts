import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { TRootState } from "../../store";
import axios from "axios";
import { sub } from "date-fns";

const POSTS_URL = "https://dummyjson.com/posts";
const ADD_POST_URL = "https://dummyjson.com/posts/add";
export interface IPost {
  id: Number;
  title: string;
  body: string;
  date: string;
  reactions: {
    [reaction: string]: number; // Index signature allows any string as key
  };
}
interface IInitialState {
  posts: IPost[];
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return response.data?.posts;
  } catch (error) {
    if (error instanceof Error) return error.message;
    return String(error);
  }
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (post: { title: string; body: string }) => {
    try {
      const response = await axios.post(ADD_POST_URL, { ...post, userId: 5 });
      return response.data;
    } catch (error) {
      if (error instanceof Error) return error.message;
      return String(error);
    }
  }
);

const initialState: IInitialState = {
  posts: [],
  error: null,
  status: "idle",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createNewPost: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, body) {
        return {
          payload: {
            id: nanoid,
            title,
            body,
            reactions: {
              like: 0,
              dislike: 0,
              love: 0,
              laugh: 0,
              sad: 0,
            },
          },
          meta: undefined,
          error: undefined,
        };
      },
    },
    addReaction(state, action) {
      const { postId, reaction } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        post.reactions = {
          ...post.reactions,
          [reaction]: post.reactions[reaction] + 1,
        };
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        let min = 1;
        state.posts = Array.isArray(action.payload)
          ? action.payload.map((post: IPost) => {
              post.reactions = {
                like: Math.round(Math.random() * 100),
                dislike: Math.round(Math.random() * 100),
                love: Math.round(Math.random() * 100),
                laugh: Math.round(Math.random() * 100),
                sad: Math.round(Math.random() * 100),
              };
              post.date = sub(new Date(), { minutes: min++ }).toISOString();
              return post;
            })
          : [];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.error.message);
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.reactions = {
          like: 0,
          dislike: 0,
          love: 0,
          laugh: 0,
          sad: 0,
        };
        action.payload.date = new Date().toISOString();
        state.posts = [action.payload, ...state.posts];
      });
  },
});

export const postsSelector = (state: TRootState) => state.posts.posts;
export const getPostsStatus = (state: TRootState) => state.posts.status;
export const getPostsError = (state: TRootState) => state.posts.error;
export const getPostById = (state: TRootState, id: Number) =>
  state.posts.posts.find(({ id: postId }) => postId === id);

export const { createNewPost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;
