import { database } from '../../config/firebaseConfig';
import { ref, set, remove, get } from 'firebase/database';

const sanitizeInput = (input) =>
  input.replace(/[.#$/[\]]/g, '-').trim().toLowerCase();

// Fetch labels for a project
export const fetchLabelsFromDatabase = async (projectName) => {
  const validProjectName = sanitizeInput(projectName);
  const labelsRef = ref(database, `${validProjectName}/labels`);
  const snapshot = await get(labelsRef);
  return snapshot.val();
};

// Add a new label to a page
export const addLabelToDatabase = async (
  projectName,
  pageName,
  labelName,
  labelValue
) => {
  const validProjectName = sanitizeInput(projectName);
  const validPageName = sanitizeInput(pageName);
  const labelRef = ref(
    database,
    `${validProjectName}/labels/pages/${validPageName}/labels/${labelName}`
  );
  await set(labelRef, labelValue);
};

// Update a label's value
export const updateLabelInDatabase = async (
  projectName,
  pageName,
  labelName,
  newLabelValue
) => {
  const validProjectName = sanitizeInput(projectName);
  const validPageName = sanitizeInput(pageName);
  const labelRef = ref(
    database,
    `${validProjectName}/labels/pages/${validPageName}/labels/${labelName}`
  );
  await set(labelRef, newLabelValue);
};

// Remove a label from a page
export const removeLabelFromDatabase = async (
  projectName,
  pageName,
  labelName
) => {
  const validProjectName = sanitizeInput(projectName);
  const validPageName = sanitizeInput(pageName);
  const labelRef = ref(
    database,
    `${validProjectName}/labels/pages/${validPageName}/labels/${labelName}`
  );
  await remove(labelRef);
};
