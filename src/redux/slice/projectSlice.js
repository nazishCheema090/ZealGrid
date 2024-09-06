import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "../../config/firebaseConfig";
import { ref, set } from "firebase/database";

export const saveProjectData = createAsyncThunk(
  "project/saveProjectData",
  async (data, thunkAPI) => {
    try {
      // Sanitize the project name to create a valid Firebase path
      const validProjectName = data.projectName.replace(/[.#$/[\]]/g, "-");

      // Create a reference to the project data in Firebase using the sanitized project name as the root
      const projectRef = ref(database, validProjectName);

      // Format the data correctly
      const formattedData = {
        company_detail: {
          email: data.companyDetail.email,
          name: data.companyDetail.companyName,
          phone_number: data.companyDetail.phone,
        },
        features: {
          labels: data.features.labels || false,
          navigation: data.features.navigation || false,
          toogles: data.features.toogles || false,
        },
      };

      await set(projectRef, formattedData);

      return formattedData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  step: 1,
  projectName: "",
  features: {},
  companyDetail: {
    email: "",
    companyName: "",
    phone: "",
  },
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setStep(state, action) {
      state.step = action.payload;
    },
    setProjectName(state, action) {
      state.projectName = action.payload;
    },
    setFeatures(state, action) {
      state.features = action.payload;
    },
    setCompanyDetail(state, action) {
      state.companyDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveProjectData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveProjectData.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(saveProjectData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setStep, setProjectName, setFeatures, setCompanyDetail } =
  projectSlice.actions;
export default projectSlice.reducer;
