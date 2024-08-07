import { createSlice } from "@reduxjs/toolkit";
import { toastOptions } from "../../utils/error";
import { toast } from "react-toastify";

const Categorieslice = createSlice({
  name: "Categories",
  initialState: {
    isFetchingCat: false,
    error: false,
    errMsg: "",
    Categories: [],
  },
  reducers: {
    getAllCategoriesStart: (state) => {
      state.isFetchingCat = true;
      state.error = false;
    },
    getAllCategoriesSuccess: (state, action) => {
      state.error = false;
      state.Categories = action.payload.category;
      state.isFetchingCat = false;
    },
    getAllCategoriesFailure: (state, action) => {
      state.errMsg = action.payload;
      state.isFetchingCat = false;
      state.error = true;
    },
    addCategoriestart: (state) => {
      state.isFetchingCat = true;
      state.error = false;
    },
    addCategoriesuccess: (state, action) => {
      state.error = false;
      state.Categories.push(action.payload.category);
      state.isFetchingCat = false;
      toast.success("Category Added Successfuly", toastOptions);
    },
    addCategoriesFailure: (state, action) => {
      state.errMsg = action.payload;
      state.isFetchingCat = false;
      state.error = true;
      toast.error(state.errMsg, toastOptions);
    },
    deleteCategoriestart: (state) => {
      state.isFetchingCat = true;
      state.error = false;
    },
    deleteCategoriesuccess: (state, action) => {
      state.error = false;
      state.Categories = state.Categories.filter(
        (category) => category.id !== action.payload.id
      );
      state.isFetchingCat = false;
    },
    deleteCategoriesFailure: (state, action) => {
      state.errMsg = action.payload;
      state.isFetchingCat = false;
      state.error = true;
    },
  },
});

export const {
  getAllCategoriesStart,
  getAllCategoriesSuccess,
  getAllCategoriesFailure,
  addCategoriestart,
  addCategoriesuccess,
  addCategoriesFailure,
  deleteCategoriestart,
  deleteCategoriesuccess,
  deleteCategoriesFailure,
} = Categorieslice.actions;
export default Categorieslice.reducer;
