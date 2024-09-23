import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/error";

const RealEstateSlice = createSlice({
  name: "realEstate",
  initialState: {
    isLoading: false,
    isError: false,
    error: null,
    data: [],
  },
  reducers: {
    getRealEstateStart: (state, action) => {
      state.isLoading = true;
    },
    getRealEstateSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.data = action.payload.queries;
    },
    getRealEstateFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    deleteRealEstateStart: (state, action) => {
      state.isLoading = true;
    },
    deleteRealEstateSuccess: (state, action) => {
      toast.success("Query Deleted Successfully", toastOptions);
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    },
    deleteRealEstateFailure: (state, action) => {
      toast.error(action.payload, toastOptions);
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export const {
  getRealEstateStart,
  getRealEstateSuccess,
  getRealEstateFailure,
  deleteRealEstateStart,
  deleteRealEstateSuccess,
  deleteRealEstateFailure,
} = RealEstateSlice.actions;
export default RealEstateSlice.reducer;
