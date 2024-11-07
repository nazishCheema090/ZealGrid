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
      staleTime: 60000, // Data is fresh for 1 minute
      cacheTime: 300000, // Cache data for 5 minutes
      refetchOnWindowFocus: false, // Do not refetch when window gains focus
      onSuccess: (data) => {
        console.log('Fetched labels data:', data);
        const labels = data || { pages: {} };
        dispatch(setLabels({ projectName, labels }));
      },
      onError: (error) => {
        console.error('Error fetching labels:', error);
        dispatch(setLabels({ projectName, labels: { pages: {} } }));
      },
    }
  );
};
