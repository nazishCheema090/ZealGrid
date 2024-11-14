import { useQuery, useMutation, useQueryClient } from 'react-query';
import { database } from '../config/firebaseConfig';
import { ref, get, set, remove } from 'firebase/database';
import { toast } from 'react-hot-toast';

const sanitizeInput = (input) => input.replace(/[.#$/[\]]/g, '-').trim().toLowerCase();

export const usePages = (projectName) => {
  const queryClient = useQueryClient();

  // Fetch pages
  const { data: pages = {}, isLoading, isError } = useQuery(
    ['pages', projectName],
    async () => {
      const projectRef = ref(database, projectName);
      const snapshot = await get(projectRef);
      const data = snapshot.val() || {};
      return {
        labels: data.labels?.pages || {},
        toggles: data.toggles?.pages || {},
        navigation: data.navigation?.pages || {}
      };
    }
  );

  // Add page mutation
  const addPage = useMutation(
    async ({ pageName, pagePath }) => {
      const validProjectName = sanitizeInput(projectName);
      const validPageName = sanitizeInput(pageName);

      const updates = {
        [`${validProjectName}/labels/pages/${validPageName}`]: {
          pagePath,
          labels: {}
        },
        [`${validProjectName}/toggles/pages/${validPageName}`]: {
          pagePath,
          toggles: {}
        },
        [`${validProjectName}/navigation/pages/${validPageName}`]: {
          pagePath,
          order: Object.keys(pages.navigation || {}).length
        }
      };

      await set(ref(database), updates);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['pages', projectName]);
        toast.success('Page added successfully');
      },
      onError: () => {
        toast.error('Failed to add page');
      }
    }
  );

  // Delete page mutation
  const deletePage = useMutation(
    async (pageName) => {
      const validProjectName = sanitizeInput(projectName);
      const validPageName = sanitizeInput(pageName);

      const updates = {
        [`${validProjectName}/labels/pages/${validPageName}`]: null,
        [`${validProjectName}/toggles/pages/${validPageName}`]: null,
        [`${validProjectName}/navigation/pages/${validPageName}`]: null
      };

      await set(ref(database), updates);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['pages', projectName]);
        toast.success('Page deleted successfully');
      },
      onError: () => {
        toast.error('Failed to delete page');
      }
    }
  );

  return {
    pages,
    isLoading,
    isError,
    addPage,
    deletePage
  };
}; 