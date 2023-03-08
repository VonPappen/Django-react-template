import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import userSlice from "./UserSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        // user: userSlice.reducer,
    },
});

export default store;
