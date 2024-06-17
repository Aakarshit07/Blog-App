import  { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer
        // TODO: add more slice here for posts
    }
})

export default store;