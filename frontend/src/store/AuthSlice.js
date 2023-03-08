import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios/axiosInstance";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        tokens: {
            accessToken: localStorage.getItem("accessToken"),
            refreshToken: localStorage.getItem("refreshToken"),
        },
        user: {
            isLoggedIn:
                !!localStorage.getItem("accessToken") &&
                !!localStorage.getItem("refreshToken"),
            username: localStorage.getItem("user"),
            id: localStorage.getItem("id"),
            email: localStorage.getItem("email"),
        },
    },
    reducers: {
        setTokens(state, action) {
            // store tokens in local storage
            state.user.isLoggedIn = true;
            localStorage.setItem("accessToken", action.payload.access);
            localStorage.setItem("refreshToken", action.payload.refresh);
            // update tokens state
            state.tokens.accessToken = action.payload.access;
            state.tokens.refreshToken = action.payload.refresh;
        },

        setUserDetails(state, action) {
            // Store User details in local storage for persitence
            localStorage.setItem("user", action.payload.username);
            localStorage.setItem("id", action.payload.id);
            localStorage.setItem("email", action.payload.email);
            // Update user detail state
            state.user.username = action.payload.username;
            state.user.id = action.payload.id;
            state.user.email = action.payload.email;
        },
        logOut(state) {
            //blacklist token
            const response = axiosInstance.post("api/logout/blacklist/", {
                refresh_token: localStorage.getItem("refreshToken"),
            });

            // Remove tokens from local storage
            state.user.isLoggedIn = false;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            // update token state
            state.tokens.accessToken = "";
            state.tokens.refreshToken = "";

            // Delete User Detail from local storage
            localStorage.removeItem("user");
            localStorage.removeItem("id");
            localStorage.removeItem("email");
            // update user detail state
            state.user.username = "";
            state.user.id = "";
            state.user.email = "";
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice;
