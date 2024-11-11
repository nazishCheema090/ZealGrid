import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./slice/projectSlice";
import labelsReducer from './slice/labelsSlice';

const store = configureStore({
  reducer: {
    project: projectReducer,
    labels: labelsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable checks
    }),
});

export default store;
