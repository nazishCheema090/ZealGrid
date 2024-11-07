// src/hooks/useAddLabelPage.js

import { useMutation, useQueryClient } from 'react-query';
import { addLabelPageToDatabase } from '../lib/utils/labelsApi';
import { addLabelPage } from '../redux/slice/labelsSlice';
import { useDispatch } from 'react-redux';

export const useAddLabelPage = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation(
    ({ projectName, pageName, pagePath }) =>
      addLabelPageToDatabase(projectName, pageName, pagePath),
    {
      onSuccess: (data, variables) => {
        dispatch(addLabelPage(variables));
        queryClient.invalidateQueries(['labels', variables.projectName]);
      },
      onError: (error) => {
        console.error('Error adding label page:', error);
      },
    }
  );
};
