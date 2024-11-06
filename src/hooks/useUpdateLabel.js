// src/hooks/useUpdateLabel.js

import { useMutation, useQueryClient } from 'react-query';
import { updateLabelInDatabase } from '../lib/utils/labelsApi';
import { updateLabel } from '../redux/slice/labelsSlice';
import { useDispatch } from 'react-redux';

export const useUpdateLabel = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation(
    ({ projectName, pageName, labelKey, newLabelValue }) =>
      updateLabelInDatabase(projectName, pageName, labelKey, newLabelValue),
    {
      onSuccess: (data, variables) => {
        dispatch(updateLabel(variables));
        queryClient.invalidateQueries(['labels', variables.projectName]);
      },
      onError: (error) => {
        console.error('Error updating label:', error);
      },
    }
  );
};
