import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
    isLogin: user ? true : false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginAuth: (state,) => {
            state.isLogin = true;
        },
        logoutAuth: (state) => {
            state.isLogin = false
        }
    }
});
export const { loginAuth, logoutAuth } = authSlice.actions
export default authSlice.reducer
