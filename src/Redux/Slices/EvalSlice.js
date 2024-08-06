import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/error";

const EvaluationSlice = createSlice({
  name: "evaluation",
  initialState: {
    isFetching: false,
    error: false,
    errMsg: "",
    evaluationform: [],
  },
  reducers: {
    getAllEvalStart: (state) => {
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
    addEvalStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addEvalSuccess: (state) => {
      state.error = false;
      state.isFetching = false;
      toast.success("Blog Added Successfully", toastOptions);
    },
    addEvalFailure: (state, action) => {
      state.errMsg = action.payload;
      state.isFetching = false;
      state.error = true;
      toast.error(state.errMsg, toastOptions);
    },
    deleteEvalStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteEvalSuccess: (state, action) => {
      state.error = false;
      state.isFetching = false;
      state.evaluationform = state.evaluationform.filter(
        (e) => e._id !== action.payload
      );
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
      const index = state.evaluationform.findIndex(
        (e) => e._id === action.payload._id
      );
      if (index !== -1) {
        state.evaluationform[index] = action.payload;
      }
    },
    updateEvalFailure: (state, action) => {
      state.errMsg = action.payload;
      state.isFetching = false;
      state.error = true;
    },
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
  updateEvalFailure,
} = EvaluationSlice.actions;

export default EvaluationSlice.reducer;
