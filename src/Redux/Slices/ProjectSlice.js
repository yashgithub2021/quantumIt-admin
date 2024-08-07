import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    isFetching: false,
    error: false,
  },
  reducers: {
    deleteProjectStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProjectSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
    },
    deleteProjectFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  deleteProjectStart,
  deleteProjectSuccess,
  deleteProjectFailure,
} = projectSlice.actions;
export default projectSlice.reducer;
