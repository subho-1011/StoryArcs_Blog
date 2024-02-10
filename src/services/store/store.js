import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import themeSlice from "./slice/themeSlice";
import postSlice from "./slice/postSlice"


const store = configureStore({
    reducer: {
        auth: authSlice,
        theme: themeSlice,
        post: postSlice,
    },
});

export default store