import { createSlice } from "@reduxjs/toolkit";

const transactionsSlice = createSlice({
    name: "transactions",
    initialState: {
        transactions: [],
        isFetching: false,
        error: false,
        errMsg: "",
    },
    reducers: {
        fetchTransactionsStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        fetchTransactionsSuccess: (state, action) => {
            state.isFetching = false;
            state.transactions = action.payload;
            state.errMsg = "";
        },
        fetchTransactionsFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.errMsg = action.payload;
        },
    },
});

export const {
    fetchTransactionsStart,
    fetchTransactionsSuccess,
    fetchTransactionsFailure
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
