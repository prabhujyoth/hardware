import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    editAction: (state, action) => {
      state.value = action.payload;
    },
    clearProduct: (state) => {
      state.value = {};
    },
  },
});

export const { editAction, clearProduct } = productSlice.actions;
export default productSlice.reducer;
