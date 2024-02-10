import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "../../appwrite/config" 
import { useSelector } from "react-redux";

export const fetchAllPosts = createAsyncThunk('posts/fetchAllPosts', async() => {
    const res = await postService.getPosts();
    const posts = res.documents;
    return posts
})

export const getPostById = createAsyncThunk("posts/getPostById", async(id) => {
    const posts = useSelector((state) => state.post.posts);
    const index = posts.findIndex(post => post.userId === id);
    if (index !== -1) return posts[index];
});

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

const postSlice = createSlice ({
    name: 'posts',
    initialState,
    reducers: {
        //initial store some post 
        initPosts(state, action) {
            state.posts = action.payload;
        },

        // add new post
        addPost(state, action) {
            state.posts.push(action.payload)
        },

        // update existing post
        updatePost(state, action) {
            const updatePost = action.payload;
            const index = state.posts.findIndex(post => post.id === updatePost.id);
            if (index !== -1) {
                state.posts[index] = updatePost;
            }
        },

        // delete post 
        deletePost(state, action) {
            state.posts = state.posts.filter(post => post.id != action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllPosts.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.status = 'succeeded';
        });
        builder.addCase(fetchAllPosts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
    }
})

export const { initPosts, addPost, updatePost, deletePost } = postSlice.actions;
export default postSlice.reducer