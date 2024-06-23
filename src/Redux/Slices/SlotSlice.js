import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/error";

const SlotSlice = createSlice({
    name: "slot",
    initialState: {
        isFetching: false,
        error: false,
        errMsg: "",
        slots: []
    },
    reducers: {
        getAllSlotStart: (state, action) => {
            state.isFetching = true;
            state.error = false;
        },
        getAllSlotSuccess: (state, action) => {
            state.error = false;
            state.slots = action.payload.queries;
            state.isFetching = false;
        },
        getAllSlotFailure: (state, action) => {
            state.errMsg = action.payload;
            state.isFetching = false;
            state.error = true;
        },
        addSlotStart: (state) => {

            state.isFetching = true;
            state.error = false;
        },
        addSlotSuccess: (state) => {
            toast.success("Slot Created Successfully", toastOptions);
            state.error = false;
            state.isFetching = false;
        },
        addSlotFailure: (state, action) => {
            toast.warning(action.payload.message, toastOptions);
            state.errMsg = action.payload;
            state.isFetching = false;
            state.error = true;
        }
    },
});

export const {
    getAllSlotStart,
    getAllSlotSuccess,
    getAllSlotFailure,
    addSlotStart,
    addSlotSuccess,
    addSlotFailure,
} = SlotSlice.actions;
export default SlotSlice.reducer;