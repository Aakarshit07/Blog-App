import  { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js"
const store = configureStore({
    reducer: {
        auth: authReducer
        // TODO: add more slice here fro posts
    }
})

export default store;