import { database } from '../../config/firebaseConfig';
import { ref, set, remove } from 'firebase/database';

const sanitizeInput = (input) =>
  input.replace(/[.#$/[\]]/g, '-').trim().toLowerCase();

export const addPageToDatabase = async (projectName, pageName, pagePath) => {
  const validProjectName = sanitizeInput(projectName);
  const validPageName = sanitizeInput(pageName);

  // Add to labels
  const labelsPageRef = ref(
    database,
    `${validProjectName}/labels/pages/${validPageName}`
  );
  await set(labelsPageRef, { pagePath, labels: {} });

  // Add to toggles
  const togglesPageRef = ref(
    database,
    `${validProjectName}/toggles/pages/${validPageName}`
  );
  await set(togglesPageRef, { pagePath, toggles: {} });

  // Add to navigation
  const navigationPageRef = ref(
    database,
    `${validProjectName}/navigation/pages/${validPageName}`
  );
  await set(navigationPageRef, { pagePath });
};

export const updatePageInDatabase = async (
  projectName,
  pageName,
  pagePath
) => {
  const validProjectName = sanitizeInput(projectName);
  const validPageName = sanitizeInput(pageName);

  // Update in labels
  const labelsPageRef = ref(
    database,
    `${validProjectName}/labels/pages/${validPageName}`
  );
  await set(labelsPageRef, { pagePath }); // Preserving existing labels

  // Update in toggles
  const togglesPageRef = ref(
    database,
    `${validProjectName}/toggles/pages/${validPageName}`
  );
  await set(togglesPageRef, { pagePath }); // Preserving existing toggles

  // Update in navigation
  const navigationPageRef = ref(
    database,
    `${validProjectName}/navigation/pages/${validPageName}`
  );
  await set(navigationPageRef, { pagePath });
};

export const removePageFromDatabase = async (projectName, pageName) => {
  const validProjectName = sanitizeInput(projectName);
  const validPageName = sanitizeInput(pageName);

  // Remove from labels
  const labelsPageRef = ref(
    database,
    `${validProjectName}/labels/pages/${validPageName}`
  );
  await remove(labelsPageRef);

  // Remove from toggles
  const togglesPageRef = ref(
    database,
    `${validProjectName}/toggles/pages/${validPageName}`
  );
  await remove(togglesPageRef);

  // Remove from navigation
  const navigationPageRef = ref(
    database,
    `${validProjectName}/navigation/pages/${validPageName}`
  );
  await remove(navigationPageRef);
};
