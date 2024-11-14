import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './slice/projectSlice';
import labelsReducer from './slice/labelsSlice';
import togglesReducer from './slice/togglesSlice';
import navigationReducer from './slice/navigationSlice';

const store = configureStore({
  reducer: {
    project: projectReducer,
    labels: labelsReducer,
    toggles: togglesReducer,
    navigation: navigationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
