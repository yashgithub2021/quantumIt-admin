import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/error";

const PlanSlice = createSlice({
  name: "plan",
  initialState: {
    isFetching: false,
    error: false,
    errMsg: "",
    plans: [],
  },
  reducers: {
    getAllPlanStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },
    getAllPlanSuccess: (state, action) => {
      state.error = false;
      state.plans = action.payload.feedbacks;
      state.isFetching = false;
    },
    getAllPlanFailure: (state, action) => {
      state.errMsg = action.payload;
      state.isFetching = false;
      state.error = true;
    },
    addPlanStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addPlanSuccess: (state) => {
      toast.success("Plan Created Successfully", toastOptions);
      state.error = false;
      state.isFetching = false;
    },
    addPlanFailure: (state, action) => {
      toast.warning(action.payload, toastOptions);
      state.errMsg = action.payload;
      state.isFetching = false;
      state.error = true;
    },
    updatePlanStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updatePlanSuccess: (state) => {
      toast.success("Plan Updated Successfully", toastOptions);
      state.error = false;
      state.isFetching = false;
    },
    updatePlanFailure: (state, action) => {
      toast.error(`${action.payload}`, toastOptions);
      state.errMsg = action.payload;
      state.isFetching = false;
      state.error = true;
    },
    removePlanStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    removePlanSuccess: (state) => {
      toast.success("Plan removed successfully", toastOptions);
      state.error = false;
      state.isFetching = false;
    },
    removePlanFailure: (state, action) => {
      toast.warning(action.payload, toastOptions);
      state.errMsg = action.payload;
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getAllPlanStart,
  getAllPlanSuccess,
  getAllPlanFailure,
  addPlanStart,
  addPlanSuccess,
  addPlanFailure,
  updatePlanStart,
  updatePlanSuccess,
  updatePlanFailure,
  removePlanStart,
  removePlanSuccess,
  removePlanFailure,
  updateCreatePlan,
} = PlanSlice.actions;
export default PlanSlice.reducer;
