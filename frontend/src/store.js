import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import todoReducer from './slices/todoSlice'
import { apiSlice } from './slices/apiSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store
