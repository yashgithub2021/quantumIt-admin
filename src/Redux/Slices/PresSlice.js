import { createSlice } from "@reduxjs/toolkit";

const PrescriptionSlice = createSlice({
  name: "prescription",
  initialState: {
    isFetching: false,
    error: false,
    errMsg: "",
    prescriptionform: [],
  },
  reducers: {
    getAllPresStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },
    getAllPresSuccess: (state, action) => {
      state.error = false;
      state.prescriptionform = action.payload.faqs;
      state.isFetching = false;
    },
    getAllPresFailure: (state, action) => {
      state.errMsg = action.payload;
      state.isFetching = false;
      state.error = true;
    },
    addPresStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },
    addPresSuccess: (state, action) => {
      state.error = false;
      state.isFetching = false;
    },
    addPresFailure: (state, action) => {
      state.errMsg = action.payload;
      state.isFetching = false;
      state.error = true;
    },
    removeFaqStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },
    removeFaqSuccess: (state, action) => {
      state.error = false;
      state.isFetching = false;
    },
    removeFaqFailure: (state, action) => {
      state.errMsg = action.payload;
      state.isFetching = false;
      state.error = true;
    },
    updateFaqStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
      state.isSuccess = false;
    },
    updateFaqSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.isSuccess = true;
    },
    updateFaqFailure: (state, action) => {
      state.errMsg = action.payload;
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getAllPresStart,
  getAllPresSuccess,
  getAllPresFailure,
  addPresStart,
  addPresSuccess,
  addPresFailure,
  removeFaqStart,
  removeFaqSuccess,
  removeFaqFailure,
  updateFaqStart,
  updateFaqFailure,
  updateFaqSuccess,
} = PrescriptionSlice.actions;
export default PrescriptionSlice.reducer;
