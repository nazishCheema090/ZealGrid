import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchNavigationFromDatabase,
  addNavigationPageToDatabase,
  updateNavigationPageInDatabase,
  removeNavigationPageFromDatabase,
} from '../../lib/utils/navigationApi';

export const fetchNavigation = createAsyncThunk(
  'navigation/fetchNavigation',
  async (projectName, { rejectWithValue }) => {
    try {
      const data = await fetchNavigationFromDatabase(projectName);
      return { projectName, navigation: data };
    } catch (error) {
      console.error('fetchNavigation - Error:', error);
      return rejectWithValue(error.message || 'Failed to fetch navigation');
    }
  }
);

export const addNavigationPageAsync = createAsyncThunk(
  'navigation/addNavigationPage',
  async ({ projectName, pageName, pagePath }, { rejectWithValue }) => {
    try {
      await addNavigationPageToDatabase(projectName, pageName, pagePath);
      return { projectName, pageName, pagePath };
    } catch (error) {
      console.error('addNavigationPageAsync - Error:', error);
      return rejectWithValue(error.message || 'Failed to add navigation page');
    }
  }
);

export const updateNavigationPageAsync = createAsyncThunk(
  'navigation/updateNavigationPage',
  async ({ projectName, pageName, newPagePath }, { rejectWithValue }) => {
    try {
      await updateNavigationPageInDatabase(projectName, pageName, newPagePath);
      return { projectName, pageName, newPagePath };
    } catch (error) {
      console.error('updateNavigationPageAsync - Error:', error);
      return rejectWithValue(error.message || 'Failed to update navigation page');
    }
  }
);

export const removeNavigationPageAsync = createAsyncThunk(
  'navigation/removeNavigationPage',
  async ({ projectName, pageName }, { rejectWithValue }) => {
    try {
      await removeNavigationPageFromDatabase(projectName, pageName);
      return { projectName, pageName };
    } catch (error) {
      console.error('removeNavigationPageAsync - Error:', error);
      return rejectWithValue(error.message || 'Failed to remove navigation page');
    }
  }
);

const initialState = {
  navigationByProject: {}, // { [projectName]: { pages: { [pageName]: { pagePath } } } }
  loading: false,
  error: null,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    addNavigationPage(state, action) {
      const { projectName, pageName, pagePath } = action.payload;
      if (!state.navigationByProject[projectName]) {
        state.navigationByProject[projectName] = { pages: {} };
      }
      state.navigationByProject[projectName].pages[pageName] = { pagePath };
    },
    updateNavigationPage(state, action) {
      const { projectName, pageName, pagePath } = action.payload;
      if (state.navigationByProject[projectName]?.pages[pageName]) {
        state.navigationByProject[projectName].pages[pageName].pagePath = pagePath;
      }
    },
    removeNavigationPage(state, action) {
      const { projectName, pageName } = action.payload;
      if (state.navigationByProject[projectName]?.pages[pageName]) {
        delete state.navigationByProject[projectName].pages[pageName];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNavigation.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNavigation.fulfilled, (state, action) => {
        const { projectName, navigation } = action.payload;
        state.navigationByProject[projectName] = navigation || { pages: {} };
        state.loading = false;
      })
      .addCase(fetchNavigation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addNavigationPageAsync.fulfilled, (state, action) => {
        const { projectName, pageName, pagePath } = action.payload;
        if (!state.navigationByProject[projectName]) {
          state.navigationByProject[projectName] = { pages: {} };
        }
        state.navigationByProject[projectName].pages[pageName] = { pagePath };
      })
      .addCase(updateNavigationPageAsync.fulfilled, (state, action) => {
        const { projectName, pageName, newPagePath } = action.payload;
        if (state.navigationByProject[projectName]?.pages[pageName]) {
          state.navigationByProject[projectName].pages[pageName].pagePath = newPagePath;
        }
      })
      .addCase(removeNavigationPageAsync.fulfilled, (state, action) => {
        const { projectName, pageName } = action.payload;
        if (state.navigationByProject[projectName]?.pages[pageName]) {
          delete state.navigationByProject[projectName].pages[pageName];
        }
      });
  },
});

export const {
  addNavigationPage,
  updateNavigationPage,
  removeNavigationPage,
} = navigationSlice.actions;

export default navigationSlice.reducer;
