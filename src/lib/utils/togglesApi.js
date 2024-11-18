import { database } from '../../config/firebaseConfig';
import { ref, set, remove, get } from 'firebase/database';

const sanitizeInput = (input) =>
  input.replace(/[.#$/[\]]/g, '-').trim().toLowerCase();

// Fetch toggles for a project
export const fetchTogglesFromDatabase = async (projectName) => {
  const validProjectName = sanitizeInput(projectName);
  const togglesRef = ref(database, `${validProjectName}/toggles`);
  const snapshot = await get(togglesRef);
  return snapshot.val();
};

// Add a new toggle to a page
export const addToggleToDatabase = async (
  projectName,
  pageName,
  toggleName,
  toggleValue,
  isActive
) => {
  const validProjectName = sanitizeInput(projectName);
  const validPageName = sanitizeInput(pageName);
  const toggleRef = ref(
    database,
    `${validProjectName}/toggles/pages/${validPageName}/toggles/${toggleName}`
  );
  await set(toggleRef, { toggleValue, isActive });
};

// Update a toggle's value and isActive status
export const updateToggleInDatabase = async (
  projectName,
  pageName,
  toggleName,
  newToggleValue,
  newIsActive
) => {
  const validProjectName = sanitizeInput(projectName);
  const validPageName = sanitizeInput(pageName);
  const toggleRef = ref(
    database,
    `${validProjectName}/toggles/pages/${validPageName}/toggles/${toggleName}`
  );
  await set(toggleRef, { toggleValue: newToggleValue, isActive: newIsActive });
};

// Remove a toggle from a page
export const removeToggleFromDatabase = async (
  projectName,
  pageName,
  toggleName
) => {
  const validProjectName = sanitizeInput(projectName);
  const validPageName = sanitizeInput(pageName);
  const toggleRef = ref(
    database,
    `${validProjectName}/toggles/pages/${validPageName}/toggles/${toggleName}`
  );
  await remove(toggleRef);
};
