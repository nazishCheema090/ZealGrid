// src/hooks/useFetchLabels.js

import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { setLabels } from '../redux/slice/labelsSlice';
import { fetchLabelsFromDatabase } from '../lib/utils/labelsApi';

export const useFetchLabels = (projectName) => {
  const dispatch = useDispatch();

  return useQuery(
    ['labels', projectName],
    () => fetchLabelsFromDatabase(projectName),
    {
      onSuccess: (data) => {
        dispatch(setLabels({ projectName, labels: data || {} }));
      },
      onError: (error) => {
        console.error('Error fetching labels:', error);
        dispatch(setLabels({ projectName, labels: {} }));
      },
      initialData: () => {
        dispatch(setLabels({ projectName, labels: {} }));
        return {};
      },
    }
  );
};
