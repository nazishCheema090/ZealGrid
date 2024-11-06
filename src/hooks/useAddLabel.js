// src/hooks/useAddLabel.js

import { useMutation, useQueryClient } from 'react-query';
import { addLabelToDatabase } from '../lib/utils/labelsApi';
import { addLabel } from '../redux/slice/labelsSlice';
import { useDispatch } from 'react-redux';

export const useAddLabel = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation(
    ({ projectName, pageName, labelKey, labelValue }) =>
      addLabelToDatabase(projectName, pageName, labelKey, labelValue),
    {
      onSuccess: (data, variables) => {
        dispatch(addLabel(variables));
        queryClient.invalidateQueries(['labels', variables.projectName]);
      },
      onError: (error) => {
        console.error('Error adding label:', error);
      },
    }
  );
};
