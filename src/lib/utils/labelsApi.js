// src/lib/utils/labelsApi.js

import { database } from '../../config/firebaseConfig';
import { ref, get, set, remove } from 'firebase/database';

const sanitizeInput = (input) => input.replace(/[.#$/[\]]/g, '-').trim().toLowerCase();

// Fetch labels for a project
export const fetchLabelsFromDatabase = async (projectName) => {
  const validProjectName = sanitizeInput(projectName);
  const labelsRef = ref(database, `${validProjectName}/labels`);
  console.log('Fetching labels from:', `${validProjectName}/labels`);
  const snapshot = await get(labelsRef);
  return snapshot.val();
};

// Add a new page to a project
export const addLabelPageToDatabase = async (projectName, pageName, pagePath) => {
  const validProjectName = sanitizeInput(projectName);
  const validPageName = sanitizeInput(pageName);
  const pageRef = ref(database, `${validProjectName}/labels/pages/${validPageName}`);
  console.log('Saving page to:', `${validProjectName}/labels/pages/${validPageName}`);
  await set(pageRef, {
    pagePath,
    labels: {},
  });
};

// Add a new label to a page
export const addLabelToDatabase = async (projectName, pageName, labelKey, labelValue) => {
  const validProjectName = sanitizeInput(projectName);
  const validPageName = sanitizeInput(pageName);
  const labelRef = ref(
    database,
    `${validProjectName}/labels/pages/${validPageName}/labels/${labelKey}`
  );
  await set(labelRef, labelValue);
};

// Remove a label from a page
export const removeLabelFromDatabase = async (projectName, pageName, labelKey) => {
  const validProjectName = sanitizeInput(projectName);
  const validPageName = sanitizeInput(pageName);
  const labelRef = ref(
    database,
    `${validProjectName}/labels/pages/${validPageName}/labels/${labelKey}`
  );
  await remove(labelRef);
};

// Remove a page from a project
export const removeLabelPageFromDatabase = async (projectName, pageName) => {
  const validProjectName = sanitizeInput(projectName);
  const validPageName = sanitizeInput(pageName);
  const pageRef = ref(database, `${validProjectName}/labels/pages/${validPageName}`);
  await remove(pageRef);
};

// Update a label's value
export const updateLabelInDatabase = async (projectName, pageName, labelKey, newLabelValue) => {
  const validProjectName = sanitizeInput(projectName);
  const validPageName = sanitizeInput(pageName);
  const labelRef = ref(
    database,
    `${validProjectName}/labels/pages/${validPageName}/labels/${labelKey}`
  );
  await set(labelRef, newLabelValue);
};

// Update a page's path
export const updateLabelPageInDatabase = async (projectName, pageName, pagePath) => {
  const validProjectName = sanitizeInput(projectName);
  const validPageName = sanitizeInput(pageName);
  const pageRef = ref(database, `${validProjectName}/labels/pages/${validPageName}`);
  const snapshot = await get(pageRef);
  if (snapshot.exists()) {
    const pageData = snapshot.val();
    pageData.pagePath = pagePath;
    await set(pageRef, pageData);
  }
};
