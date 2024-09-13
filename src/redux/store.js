import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./slice/projectSlice";

const store = configureStore({
  reducer: {
    project: projectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable checks
    }),
});

export default store;
