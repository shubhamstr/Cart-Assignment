import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice" // sample slice

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})
