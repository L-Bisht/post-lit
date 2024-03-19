import { createSlice, nanoid } from "@reduxjs/toolkit";
import { TRootState } from "../../store";

export interface IPost {
  id: string;
  title: string;
  description: string;
  reactions: {
    [reaction: string]: number; // Index signature allows any string as key
  };
}

const initialState: Array<IPost> = [
  {
    id: "aswqs_12ef",
    title: "New bike",
    description: "Bought a new bike today",
    reactions: {
      like: 9,
      dislike: 0,
      love: 2,
      laugh: 3,
      sad: 0,
    },
  },
  {
    id: "aswqs_12eg",
    title: "New Car",
    description: "Dad bought a new car for me today",
    reactions: {
      like: 9,
      dislike: 0,
      love: 2,
      laugh: 3,
      sad: 0,
    },
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addNewPost: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid,
            title,
            content,
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
      const post = state.find((post) => post.id === postId);
      if (post) {
        post.reactions = {
          ...post.reactions,
          [reaction]: post.reactions[reaction] + 1,
        };
      }
    },
  },
});

export const postsSelector = (state: TRootState) => state.posts;

export const { addNewPost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;
