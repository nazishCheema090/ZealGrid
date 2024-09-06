import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../config/firebaseConfig";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
} from "firebase/auth";

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk("auth/signOut", async (_, thunkAPI) => {
  try {
    await firebaseSignOut(auth);
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email, thunkAPI) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return "Password reset email sent";
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const observeAuthState = createAsyncThunk(
  "auth/observeAuthState",
  async (_, thunkAPI) => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const token = await user.getIdToken(true);
          if (token) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            resolve(user);
          }
        } else {
          localStorage.removeItem("currentUser");
          resolve(null);
        }
      });
    });
  }
);

const storedUser = localStorage.getItem("currentUser");
const initialUser = storedUser ? JSON.parse(storedUser) : null;

const initialState = {
  currentUser: initialUser,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        localStorage.setItem("currentUser", JSON.stringify(action.payload)); // Fixed typo here
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.currentUser = null;
        state.loading = false;
        localStorage.removeItem("currentUser"); // Remove user from local storage
      })
      .addCase(signOut.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(observeAuthState.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
