import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './features/productApi';
import modalReducer from './features/modal/modalSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  
  // Add the API middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
