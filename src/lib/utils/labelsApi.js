// src/lib/utils/labelsApi.js

import { database } from '../../config/firebaseConfig';
import { ref, get, set, remove } from 'firebase/database';

// Fetch labels for a project
export const fetchLabelsFromDatabase = async (projectName) => {
  const labelsRef = ref(database, `${projectName}/labels`);
  const snapshot = await get(labelsRef);
  return snapshot.val();
};

// Add a new page to a project
export const addLabelPageToDatabase = async (projectName, pageName) => {
  const pageRef = ref(database, `${projectName}/labels/${pageName}`);
  await set(pageRef, {});
};

// Add a new label to a page
export const addLabelToDatabase = async (projectName, pageName, labelKey, labelValue) => {
  const labelRef = ref(database, `${projectName}/labels/${pageName}/${labelKey}`);
  await set(labelRef, labelValue);
};

// Remove a label from a page
export const removeLabelFromDatabase = async (projectName, pageName, labelKey) => {
  const labelRef = ref(database, `${projectName}/labels/${pageName}/${labelKey}`);
  await remove(labelRef);
};

// Remove a page from a project
export const removeLabelPageFromDatabase = async (projectName, pageName) => {
  const pageRef = ref(database, `${projectName}/labels/${pageName}`);
  await remove(pageRef);
};

// Update a label's value
export const updateLabelInDatabase = async (projectName, pageName, labelKey, newLabelValue) => {
  const labelRef = ref(database, `${projectName}/labels/${pageName}/${labelKey}`);
  await set(labelRef, newLabelValue);
};
