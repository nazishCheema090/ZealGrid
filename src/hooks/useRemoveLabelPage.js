// src/hooks/useRemoveLabelPage.js

import { useMutation, useQueryClient } from 'react-query';
import { removeLabelPageFromDatabase } from '../lib/utils/labelsApi';
import { removeLabelPage } from '../redux/slice/labelsSlice';
import { useDispatch } from 'react-redux';

export const useRemoveLabelPage = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation(
    ({ projectName, pageName }) => removeLabelPageFromDatabase(projectName, pageName),
    {
      onSuccess: (data, variables) => {
        dispatch(removeLabelPage(variables));
        queryClient.invalidateQueries(['labels', variables.projectName]);
      },
      onError: (error) => {
        console.error('Error removing label page:', error);
      },
    }
  );
};
