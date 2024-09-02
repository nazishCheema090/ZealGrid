import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import projectReducer from './features/project/projectSlice';




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