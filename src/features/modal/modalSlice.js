import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    productToEdit: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.productToEdit = action.payload || null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.productToEdit = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;


