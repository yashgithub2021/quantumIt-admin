import { configureStore } from "@reduxjs/toolkit";
import DoctorSlice from "./Slices/DoctorSlice";
import AuthSlice from "./Slices/AuthSlice";
import PresSlice from "./Slices/PresSlice";
import EvalSlice from "./Slices/EvalSlice";
import ClinicSlice from "./Slices/ClinicSlice";
import SlotSlice from "./Slices/SlotSlice";
import PlanSlice from "./Slices/PlanSlice";

export default configureStore({
    reducer: {
        auth: AuthSlice,
        doc: DoctorSlice,
        pres: PresSlice,
        eval: EvalSlice,
        clinic: ClinicSlice,
        slot: SlotSlice,
        plan: PlanSlice
    }
})