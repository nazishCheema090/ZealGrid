// src/hooks/useRemoveLabel.js

import { useMutation, useQueryClient } from 'react-query';
import { removeLabelFromDatabase } from '../lib/utils/labelsApi';
import { removeLabel } from '../redux/slice/labelsSlice';
import { useDispatch } from 'react-redux';

export const useRemoveLabel = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation(
    ({ projectName, pageName, labelKey }) =>
      removeLabelFromDatabase(projectName, pageName, labelKey),
    {
      onSuccess: (data, variables) => {
        dispatch(removeLabel(variables));
        queryClient.invalidateQueries(['labels', variables.projectName]);
      },
      onError: (error) => {
        console.error('Error removing label:', error);
      },
    }
  );
};
