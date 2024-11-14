import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addToggleToDatabase,
  updateToggleInDatabase,
  removeToggleFromDatabase,
  fetchTogglesFromDatabase,
} from '../../lib/utils/togglesApi';

export const fetchToggles = createAsyncThunk(
  'toggles/fetchToggles',
  async (projectName) => {
    const data = await fetchTogglesFromDatabase(projectName);
    return { projectName, toggles: data };
  }
);

export const addToggleAsync = createAsyncThunk(
    'toggles/addToggle',
    async ({ projectName, pageName, toggleName, toggleValue, isActive }, { rejectWithValue }) => {
      try {
        console.log('addToggleAsync - Starting');
        await addToggleToDatabase(projectName, pageName, toggleName, toggleValue, isActive);
        console.log('addToggleAsync - Toggle added to database');
        return { projectName, pageName, toggleName, toggleValue, isActive };
      } catch (error) {
        console.error('addToggleAsync - Error:', error);
        return rejectWithValue(error.message || 'Failed to add toggle');
      }
    }
  );

export const updateToggleAsync = createAsyncThunk(
  'toggles/updateToggle',
  async ({
    projectName,
    pageName,
    toggleName,
    newToggleValue,
    newIsActive,
  }) => {
    await updateToggleInDatabase(
      projectName,
      pageName,
      toggleName,
      newToggleValue,
      newIsActive
    );
    return {
      projectName,
      pageName,
      toggleName,
      newToggleValue,
      newIsActive,
    };
  }
);

export const removeToggleAsync = createAsyncThunk(
  'toggles/removeToggle',
  async ({ projectName, pageName, toggleName }) => {
    await removeToggleFromDatabase(projectName, pageName, toggleName);
    return { projectName, pageName, toggleName };
  }
);

const initialState = {
  togglesByProject: {}, // { [projectName]: { pages: { [pageName]: { pagePath, toggles } } } }
  loading: false,
  error: null,
};

const togglesSlice = createSlice({
  name: 'toggles',
  initialState,
  reducers: {
    setToggles(state, action) {
      const { projectName, toggles } = action.payload;
      const pages = (toggles && toggles.pages) || {};
      state.togglesByProject[projectName] = { pages };
    },
    addTogglePage(state, action) {
      const { projectName, pageName, pagePath } = action.payload;
      if (!state.togglesByProject[projectName]) {
        state.togglesByProject[projectName] = { pages: {} };
      }
      state.togglesByProject[projectName].pages[pageName] = {
        pagePath,
        toggles: {},
      };
    },
    updateTogglePage(state, action) {
      const { projectName, pageName, pagePath } = action.payload;
      if (state.togglesByProject[projectName]?.pages[pageName]) {
        state.togglesByProject[projectName].pages[pageName].pagePath = pagePath;
      }
    },
    removeTogglePage(state, action) {
      const { projectName, pageName } = action.payload;
      if (state.togglesByProject[projectName]) {
        delete state.togglesByProject[projectName].pages[pageName];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToggles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchToggles.fulfilled, (state, action) => {
        const { projectName, toggles } = action.payload;
        state.togglesByProject[projectName] = toggles || { pages: {} };
        state.loading = false;
      })
      .addCase(fetchToggles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToggleAsync.fulfilled, (state, action) => {
        const { projectName, pageName, toggleName, toggleValue, isActive } =
          action.payload;
        if (!state.togglesByProject[projectName]?.pages[pageName]) {
          state.togglesByProject[projectName].pages[pageName] = {
            toggles: {},
          };
        }
        state.togglesByProject[projectName].pages[pageName].toggles[
          toggleName
        ] = { toggleValue, isActive };
      })
      .addCase(updateToggleAsync.fulfilled, (state, action) => {
        const {
          projectName,
          pageName,
          toggleName,
          newToggleValue,
          newIsActive,
        } = action.payload;
        if (state.togglesByProject[projectName]?.pages[pageName]) {
          state.togglesByProject[projectName].pages[pageName].toggles[
            toggleName
          ] = { toggleValue: newToggleValue, isActive: newIsActive };
        }
      })
      .addCase(removeToggleAsync.fulfilled, (state, action) => {
        const { projectName, pageName, toggleName } = action.payload;
        if (state.togglesByProject[projectName]?.pages[pageName]) {
          delete state.togglesByProject[projectName].pages[pageName].toggles[
            toggleName
          ];
        }
      });
  },
});

export const {
  setToggles,
  addTogglePage,
  updateTogglePage,
  removeTogglePage,
} = togglesSlice.actions;

export default togglesSlice.reducer;
