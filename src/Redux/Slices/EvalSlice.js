import { createSlice } from "@reduxjs/toolkit";

const EvaluatiionSlice = createSlice({
    name: "evaluation",
    initialState: {
        isFetching: false,
        error: false,
        errMsg: "",
        evaluationform: []
    },
    reducers: {
        getAllEvalStart: (state, action) => {
            state.isFetching = true;
            state.error = false;
        },
        getAllEvalSuccess: (state, action) => {
            state.error = false;
            state.evaluationform = action.payload.blogs;
            state.isFetching = false;
        },
        getAllEvalFailure: (state, action) => {
            state.errMsg = action.payload;
            state.isFetching = false;
            state.error = true;
        },
        addEvalStart: (state, action) => {
            state.isFetching = true;
            state.error = false;
        },
        addEvalSuccess: (state, action) => {
            state.error = false;
            state.isFetching = false;
        },
        addEvalFailure: (state, action) => {
            state.errMsg = action;
            state.isFetching = false;
            state.error = true;
        },
        deleteEvalStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteEvalSuccess: (state, action) => {
            state.error = false;
            state.isFetching = false;
            state.evaluationform = state.evaluationform.filter(e => e._id !== action.payload);
        },
        deleteEvalFailure: (state, action) => {
            state.errMsg = action.payload;
            state.isFetching = false;
            state.error = true;
        },
        updateEvalStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateEvalSuccess: (state, action) => {
            state.error = false;
            state.isFetching = false;
            const index = state.evaluationform.findIndex(e => e._id === action.payload._id);
            if (index !== -1) {
                state.evaluationform[index] = action.payload;
            }
        },
        updateEvalFailure: (state, action) => {
            state.errMsg = action.payload;
            state.isFetching = false;
            state.error = true;
        }
    },
});

export const {
    getAllEvalStart,
    getAllEvalSuccess,
    getAllEvalFailure,
    addEvalStart,
    addEvalSuccess,
    addEvalFailure,
    deleteEvalStart,
    deleteEvalSuccess,
    deleteEvalFailure,
    updateEvalStart,
    updateEvalSuccess,
    updateEvalFailure
} = EvaluatiionSlice.actions;

export default EvaluatiionSlice.reducer;