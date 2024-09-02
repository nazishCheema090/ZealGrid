import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import projectReducer from './slice/projectSlice';




const store = configureStore({
    reducer : {
        auth : authReducer,
        project : projectReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable checks
    }),
})

export default store;