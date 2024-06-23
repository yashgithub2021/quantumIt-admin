import { createSlice } from "@reduxjs/toolkit";
import { GetProfile, updateProfile } from "../ApiCalls"; // Adjust the path as necessary

const token = localStorage.getItem("token");
const userInfoString = localStorage.getItem("userInfo");

const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token,
        userInfo,
        isFetching: false,
        error: false,
        errMsg: "",
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        loginSuccess: (state, action) => {
            state.errMsg = "";
            state.isFetching = false;
            state.userInfo = action.payload.user;
            state.token = action.payload.token;

            localStorage.setItem("token", state.token);
            localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        },
        loginFailure: (state, action) => {
            state.errMsg = action.payload;
            state.isFetching = false;
            state.error = true;
        },
        logOut: (state) => {
            state.userInfo = null;
            state.token = null;
            localStorage.removeItem("userInfo");
            localStorage.removeItem("token");
        },
        UpdateStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        UpdateSuccess: (state, action) => {
            state.isFetching = false;
            state.userInfo = action.payload.user;
            localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        },
        UpdateFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.errMsg = action.payload;
        },
    },
    extraReducers: {
        [GetProfile.pending]: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        [GetProfile.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.userInfo = action.payload;
        },
        [GetProfile.rejected]: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.errMsg = action.payload;
        },
        [updateProfile.pending]: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        [updateProfile.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        },
        [updateProfile.rejected]: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.errMsg = action.payload;
        },
    },
});

export const {
    logOut,
    loginStart,
    loginSuccess,
    loginFailure,
    UpdateFailure,
    UpdateStart,
    UpdateSuccess
} = authSlice.actions;

export default authSlice.reducer;
