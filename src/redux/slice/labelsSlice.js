import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addLabelToDatabase,
  updateLabelInDatabase,
  removeLabelFromDatabase,
  fetchLabelsFromDatabase,
} from '../../lib/utils/labelsApi';

export const fetchLabels = createAsyncThunk(
  'labels/fetchLabels',
  async (projectName) => {
    const data = await fetchLabelsFromDatabase(projectName);
    return { projectName, labels: data };
  }
);

// labelsSlice.js

export const addLabelAsync = createAsyncThunk(
  'labels/addLabel',
  async ({ projectName, pageName, labelName, labelValue }, { rejectWithValue }) => {
    try {
      console.log('addLabelAsync - Starting');
      await addLabelToDatabase(projectName, pageName, labelName, labelValue);
      console.log('addLabelAsync - Label added to database');
      return { projectName, pageName, labelName, labelValue };
    } catch (error) {
      console.error('addLabelAsync - Error:', error);
      return rejectWithValue(error.message || 'Failed to add label');
    }
  }
);



export const updateLabelAsync = createAsyncThunk(
  'labels/updateLabel',
  async ({ projectName, pageName, labelName, newLabelValue }) => {
    await updateLabelInDatabase(projectName, pageName, labelName, newLabelValue);
    return { projectName, pageName, labelName, newLabelValue };
  }
);

export const removeLabelAsync = createAsyncThunk(
  'labels/removeLabel',
  async ({ projectName, pageName, labelName }) => {
    await removeLabelFromDatabase(projectName, pageName, labelName);
    return { projectName, pageName, labelName };
  }
);

const initialState = {
  labelsByProject: {}, // { [projectName]: { pages: { [pageName]: { pagePath, labels } } } }
  loading: false,
  error: null,
};

const labelsSlice = createSlice({
  name: 'labels',
  initialState,
  reducers: {
    setLabels(state, action) {
      const { projectName, labels } = action.payload;
      const pages = (labels && labels.pages) || {};
      state.labelsByProject[projectName] = { pages };
    },
    addLabelPage(state, action) {
      const { projectName, pageName, pagePath } = action.payload;
      if (!state.labelsByProject[projectName]) {
        state.labelsByProject[projectName] = { pages: {} };
      }
      state.labelsByProject[projectName].pages[pageName] = {
        pagePath,
        labels: {},
      };
    },
    updateLabelPage(state, action) {
      const { projectName, pageName, pagePath } = action.payload;
      if (state.labelsByProject[projectName]?.pages[pageName]) {
        state.labelsByProject[projectName].pages[pageName].pagePath = pagePath;
      }
    },
    removeLabelPage(state, action) {
      const { projectName, pageName } = action.payload;
      if (state.labelsByProject[projectName]) {
        delete state.labelsByProject[projectName].pages[pageName];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLabels.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLabels.fulfilled, (state, action) => {
        const { projectName, labels } = action.payload;
        state.labelsByProject[projectName] = labels || { pages: {} };
        state.loading = false;
      })
      .addCase(fetchLabels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addLabelAsync.fulfilled, (state, action) => {
        const { projectName, pageName, labelName, labelValue } = action.payload;
        if (!state.labelsByProject[projectName]?.pages[pageName]) {
          state.labelsByProject[projectName].pages[pageName] = {
            labels: {},
          };
        }
        state.labelsByProject[projectName].pages[pageName].labels[labelName] =
          labelValue;
      })
      .addCase(updateLabelAsync.fulfilled, (state, action) => {
        const { projectName, pageName, labelName, newLabelValue } = action.payload;
        if (state.labelsByProject[projectName]?.pages[pageName]) {
          state.labelsByProject[projectName].pages[pageName].labels[labelName] =
            newLabelValue;
        }
      })
      .addCase(removeLabelAsync.fulfilled, (state, action) => {
        const { projectName, pageName, labelName } = action.payload;
        if (state.labelsByProject[projectName]?.pages[pageName]) {
          delete state.labelsByProject[projectName].pages[pageName].labels[
            labelName
          ];
        }
      });
  },
});

export const {
  setLabels,
  addLabelPage,
  updateLabelPage,
  removeLabelPage,
} = labelsSlice.actions;

export default labelsSlice.reducer;
