import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "../../appwrite/config";

//  * Thunk action for fetch all posts from appwrite
export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async () => {
    const res = await postService.getPosts();
    const posts = res.documents;
    return posts;
  }
);

// * Thunk action for add new posts
export const addPost = createAsyncThunk("posts/addPost", async (postData) => {
  try {
    // dispatch a local addpost action to the post data store
    // dispath(addPostLocally(postData));

    // call appwrite service
    const addPost = await postService.createPost(postData);
    console.log(postData);
    return addPost;
  } catch (err) {
    console.error("Error in postSlice addpost : ", err.message);
    throw new Error("Error in postSlice add : ", err.message);
  }
});

// * Thunk action for update post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ postId, postData }) => {
    try {
      const updatedPost = await postService.updatePost(postId, postData);
      return updatedPost;
    } catch (error) {
      throw new Error("Failed to update post: " + error.message);
    }
  }
);

//  * delete post by id
export const deletePostById = createAsyncThunk(
  "posts/deletePostById",
  async (id) => {
    const res = await postService.deletePost(id);
    return res;
  }
);

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    //initial store some post
    initPosts(state, action) {
      state.posts = action.payload;
    },

    // * add new post
    addPostLocally(state, action) {
      state.posts.push(action.payload);
    },

    // * update existing post
    updatePost(state, action) {
      const { id } = action.payload;
      const index = state.posts.findIndex((post) => post.id === id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },

    //  get post by id
    getPostById(state, action) {
      state.posts = action.payload;
    },

    // delete post
    deletePost(state, action) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    // * fetch all posts from the appwrite database
    builder.addCase(fetchAllPosts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(fetchAllPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    //  * Reducer for add post action
    builder.addCase(addPost.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.posts.push(action.payload);
    });
    builder.addCase(addPost.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    //  * Reducer for update post action
    builder.addCase(updatePost.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.status = "succeeded";
      // Update the post in the state with the updated data
      const updatedPost = action.payload;
      const index = state.posts.findIndex((post) => post.id === updatedPost.id);
      if (index !== -1) {
        state.posts[index] = updatedPost;
      }
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    //  * delete posts from store
    builder.addCase(deletePostById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deletePostById.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    });
    builder.addCase(deletePostById.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

// export const { initPosts, addPostLocally, updatePost, deletePost } = postSlice.actions;
export default postSlice.reducer;
