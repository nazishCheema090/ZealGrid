// src/redux/slice/labelsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  labelsByProject: {}, // { [projectName]: { pages: { [pageName]: { pagePath, labels } } } }
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
      if (!state.labelsByProject[projectName].pages[pageName]) {
        state.labelsByProject[projectName].pages[pageName] = {
          pagePath,
          labels: {},
        };
      }
    },
    addLabel(state, action) {
      const { projectName, pageName, labelKey, labelValue } = action.payload;
      if (state.labelsByProject[projectName]?.pages[pageName]) {
        if (!state.labelsByProject[projectName].pages[pageName].labels) {
          state.labelsByProject[projectName].pages[pageName].labels = {};
        }
        state.labelsByProject[projectName].pages[pageName].labels[labelKey] = labelValue;
      }
    },
    removeLabel(state, action) {
      const { projectName, pageName, labelKey } = action.payload;
      if (state.labelsByProject[projectName]?.pages[pageName]) {
        delete state.labelsByProject[projectName].pages[pageName].labels[labelKey];
      }
    },
    removeLabelPage(state, action) {
      const { projectName, pageName } = action.payload;
      if (state.labelsByProject[projectName]) {
        delete state.labelsByProject[projectName].pages[pageName];
      }
    },
    updateLabel(state, action) {
      const { projectName, pageName, labelKey, newLabelValue } = action.payload;
      if (state.labelsByProject[projectName]?.pages[pageName]) {
        state.labelsByProject[projectName].pages[pageName].labels[labelKey] = newLabelValue;
      }
    },
    updateLabelPage(state, action) {
      const { projectName, pageName, pagePath } = action.payload;
      if (state.labelsByProject[projectName]?.pages[pageName]) {
        state.labelsByProject[projectName].pages[pageName].pagePath = pagePath;
      }
    },
  },
});

export const {
  setLabels,
  addLabelPage,
  addLabel,
  removeLabel,
  removeLabelPage,
  updateLabel,
  updateLabelPage,
} = labelsSlice.actions;

export default labelsSlice.reducer;
