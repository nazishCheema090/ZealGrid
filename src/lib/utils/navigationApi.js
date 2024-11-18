import { database } from '../../config/firebaseConfig';
import { ref, set, remove, get } from 'firebase/database';

const sanitizeInput = (input) =>
  input.replace(/[.#$/[\]]/g, '-').trim().toLowerCase();

// Fetch navigation data for a project
export const fetchNavigationFromDatabase = async (projectName) => {
  const validProjectName = sanitizeInput(projectName);
  const navigationRef = ref(database, `${validProjectName}/navigation`);
  const snapshot = await get(navigationRef);
  const data = snapshot.val();
  console.log('fetchNavigationFromDatabase - Data:', data);
  return data;
};

// Add a new navigation page
export const addNavigationPageToDatabase = async (
  projectName,
  pageName,
  pagePath
) => {
  try {
    const validProjectName = sanitizeInput(projectName);
    const validPageName = sanitizeInput(pageName);
    const pageRef = ref(
      database,
      `${validProjectName}/navigation/pages/${validPageName}`
    );
    await set(pageRef, { pagePath });
    console.log('Navigation page added to database successfully');
  } catch (error) {
    console.error('Error adding navigation page to database:', error);
    throw error;
  }
};

// Update a navigation page
export const updateNavigationPageInDatabase = async (
  projectName,
  pageName,
  newPagePath
) => {
  try {
    const validProjectName = sanitizeInput(projectName);
    const validPageName = sanitizeInput(pageName);
    const pageRef = ref(
      database,
      `${validProjectName}/navigation/pages/${validPageName}`
    );
    await set(pageRef, { pagePath: newPagePath });
    console.log('Navigation page updated in database successfully');
  } catch (error) {
    console.error('Error updating navigation page in database:', error);
    throw error;
  }
};

// Remove a navigation page
export const removeNavigationPageFromDatabase = async (
  projectName,
  pageName
) => {
  try {
    const validProjectName = sanitizeInput(projectName);
    const validPageName = sanitizeInput(pageName);
    const pageRef = ref(
      database,
      `${validProjectName}/navigation/pages/${validPageName}`
    );
    await remove(pageRef);
    console.log('Navigation page removed from database successfully');
  } catch (error) {
    console.error('Error removing navigation page from database:', error);
    throw error;
  }
};
