// src/redux/slice/labelsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  labelsByProject: {}, // { [projectName]: { [pageName]: { [labelKey]: labelValue } } }
};

const labelsSlice = createSlice({
  name: 'labels',
  initialState,
  reducers: {
    setLabels(state, action) {
      const { projectName, labels } = action.payload;
      state.labelsByProject[projectName] = labels || {};
    },
    addLabelPage(state, action) {
      const { projectName, pageName } = action.payload;
      if (!state.labelsByProject[projectName]) {
        state.labelsByProject[projectName] = {};
      }
      if (!state.labelsByProject[projectName][pageName]) {
        state.labelsByProject[projectName][pageName] = {};
      }
    },
    addLabel(state, action) {
      const { projectName, pageName, labelKey, labelValue } = action.payload;
      if (state.labelsByProject[projectName]?.[pageName]) {
        state.labelsByProject[projectName][pageName][labelKey] = labelValue;
      }
    },
    removeLabel(state, action) {
      const { projectName, pageName, labelKey } = action.payload;
      if (state.labelsByProject[projectName]?.[pageName]) {
        delete state.labelsByProject[projectName][pageName][labelKey];
      }
    },
    removeLabelPage(state, action) {
      const { projectName, pageName } = action.payload;
      if (state.labelsByProject[projectName]) {
        delete state.labelsByProject[projectName][pageName];
      }
    },
    updateLabel(state, action) {
      const { projectName, pageName, labelKey, newLabelValue } = action.payload;
      if (state.labelsByProject[projectName]?.[pageName]) {
        state.labelsByProject[projectName][pageName][labelKey] = newLabelValue;
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
} = labelsSlice.actions;

export default labelsSlice.reducer;
