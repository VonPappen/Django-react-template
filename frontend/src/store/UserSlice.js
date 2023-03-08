import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "../lib/auth/api";

const userSlice = createSlice({
    name: "user",
    initialState: {
        username: localStorage.getItem("user"),
        id: localStorage.getItem("id"),
        email: localStorage.getItem("email"),
    },
    reducers: {
        logUserIn(state, action) {
            console.log(action.payload);
            localStorage.setItem("user", action.payload.username);
            localStorage.setItem("id", action.payload.id);
            localStorage.setItem("email", action.payload.email);
            state.username = action.payload.username;
            state.id = action.payload.id;
            state.email = action.payload.email;
        },
        logUserOut(state) {
            localStorage.removeItem("user");
            localStorage.removeItem("id");
            localStorage.removeItem("email");
            state.username = "";
            state.id = "";
            state.email = "";
        },
    },
});

export const userActions = userSlice.actions;
export default userSlice;

// export const storeUserInfo = (userInfo) => {
//     return async (dispatch) => {
//         try {
//             console.log(userInfo);
//             // const {username, email, id} = data
//             dispatch(
//                 userActions.logUserIn({
//                     ...userInfo,
//                 })
//             );
//         } catch (error) {
//             console.log(error);
//         }
//     };
// };
