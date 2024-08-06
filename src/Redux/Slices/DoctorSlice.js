import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/error";

const DoctorSlice = createSlice({
  name: "doctors",
  initialState: {
    isFetching: true,
    error: true,
    errMsg: "",
    doctors: [],
  },
  reducers: {
    getAllDocStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },
    getAllDocSuccess: (state, action) => {
      state.error = false;
      state.doctors = action.payload.contributors;
      state.isFetching = false;
    },
    getAllDocFailure: (state, action) => {
      state.errMsg = action.payload;
      state.isFetching = false;
      state.error = true;
    },
    addDocStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },
    addDocSuccess: (state, action) => {
      toast.success("Contributor Added Successfully", toastOptions);
      state.error = false;
      state.doctors = action.payload.data;
      state.isFetching = false;
    },
    addDocFailure: (state, action) => {
      toast.error(`${action.payload}`, toastOptions);
      state.errMsg = action.payload;
      state.isFetching = false;
      state.error = true;
    },
    removeDocStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },
    removeDocSuccess: (state, action) => {
      toast.success("Contributor Removed Successfully", toastOptions);
      state.error = false;
      state.isFetching = false;
    },
    removeDocFailure: (state, action) => {
      toast.error(`${action.payload}`, toastOptions);
      state.errMsg = action.payload;
      state.isFetching = false;
      state.error = true;
    },
    updateDocStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateDocSuccess: (state) => {
      toast.success("Contributor Updated Successfully", toastOptions);
      state.error = false;
      state.isFetching = false;
    },
    updateDocFailure: (state, action) => {
      toast.error(`${action.payload}`, toastOptions);
      state.errMsg = action.payload;
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getAllDocStart,
  getAllDocSuccess,
  getAllDocFailure,
  addDocStart,
  addDocSuccess,
  addDocFailure,
  removeDocStart,
  removeDocSuccess,
  removeDocFailure,
  updateDocStart,
  updateDocSuccess,
  updateDocFailure,
} = DoctorSlice.actions;
export default DoctorSlice.reducer;
