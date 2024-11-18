import {
    addLabelPage,
    updateLabelPage,
    removeLabelPage,
  } from '../slice/labelsSlice';
  import {
    addTogglePage,
    updateTogglePage,
    removeTogglePage,
  } from '../slice/togglesSlice';
  // Assuming you have navigationSlice, adjust accordingly
  import {
    addNavigationPage,
    updateNavigationPage,
    removeNavigationPage,
  } from '../slice/navigationSlice';
  import {
    addPageToDatabase,
    updatePageInDatabase,
    removePageFromDatabase,
  } from '../../lib/utils/pagesApi';
  
  export const addPage = ({ projectName, pageName, pagePath }) => async (
    dispatch
  ) => {
    try {
      await addPageToDatabase(projectName, pageName, pagePath);
      dispatch(addLabelPage({ projectName, pageName, pagePath }));
      dispatch(addTogglePage({ projectName, pageName, pagePath }));
      dispatch(addNavigationPage({ projectName, pageName, pagePath }));
    } catch (error) {
      console.error('Error adding page:', error);
      throw error;
    }
  };
  
  export const updatePage = ({ projectName, pageName, pagePath }) => async (
    dispatch
  ) => {
    try {
      await updatePageInDatabase(projectName, pageName, pagePath);
      dispatch(updateLabelPage({ projectName, pageName, pagePath }));
      dispatch(updateTogglePage({ projectName, pageName, pagePath }));
      dispatch(updateNavigationPage({ projectName, pageName, pagePath }));
    } catch (error) {
      console.error('Error updating page:', error);
      throw error;
    }
  };
  
  export const removePage = ({ projectName, pageName }) => async (dispatch) => {
    try {
      await removePageFromDatabase(projectName, pageName);
      dispatch(removeLabelPage({ projectName, pageName }));
      dispatch(removeTogglePage({ projectName, pageName }));
      dispatch(removeNavigationPage({ projectName, pageName }));
    } catch (error) {
      console.error('Error removing page:', error);
      throw error;
    }
  };
  