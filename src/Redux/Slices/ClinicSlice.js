import { createSlice } from "@reduxjs/toolkit";

const ClinicSlice = createSlice({
    name: "Clinics",
    initialState: {
        isFetching: false,
        error: false,
        errMsg: "",
        clinics: []
    },
    reducers: {
        getAllClinicsStart: (state, action) => {
            state.isFetching = true;
            state.error = false;
        },
        getAllClinicsSuccess: (state, action) => {
            state.error = false;
            state.clinics = action.payload.project;
            state.isFetching = false;
        },
        getAllClinicsFailure: (state, action) => {
            state.errMsg = action.payload;
            state.isFetching = false;
            state.error = true;
        },
        addClinicStart: (state, action) => {
            state.isFetching = true;
            state.error = false;
        },
        addClinicSuccess: (state, action) => {
            state.error = false;
            state.clinics = action.payload.data;
            state.isFetching = false;
        },
        addClinicFailure: (state, action) => {
            state.errMsg = action.payload;
            state.isFetching = false;
            state.error = true;
        },
        updateClinicStart: (state, action) => {
            state.isFetching = true;
            state.error = false;
        },
        updateClinicSuccess: (state, action) => {
            state.error = false;
            state.isFetching = false;
            const index = state.clinics.findIndex(clinic => clinic._id === action.payload._id);
            if (index !== -1) {
                state.clinics[index] = action.payload;
            }
        },
        updateClinicFailure: (state, action) => {
            state.errMsg = action.payload;
            state.isFetching = false;
            state.error = true;
        }
    },
});

export const {
    getAllClinicsStart,
    getAllClinicsSuccess,
    getAllClinicsFailure,
    addClinicStart,
    addClinicSuccess,
    addClinicFailure,
    updateClinicStart,
    updateClinicSuccess,
    updateClinicFailure
} = ClinicSlice.actions;
export default ClinicSlice.reducer;
