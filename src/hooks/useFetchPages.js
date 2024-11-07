// src/hooks/useFetchPages.js

import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { setLabels } from '../redux/slice/labelsSlice';
import { fetchPagesFromDatabase } from '../lib/utils/labelsApi';

export const useFetchPages = (projectName) => {
  const dispatch = useDispatch();

  return useQuery(
    ['pages', projectName],
    () => fetchPagesFromDatabase(projectName),
    {
      staleTime: 60000,
      cacheTime: 300000,
      refetchOnWindowFocus: false,
      onSuccess: (pages) => {
        pages = pages || {};
        dispatch(setLabels({ projectName, labels: { pages } }));
      },
      onError: (error) => {
        console.error('Error fetching pages:', error);
        dispatch(setLabels({ projectName, labels: { pages: {} } }));
      },
      initialData: () => {
        dispatch(setLabels({ projectName, labels: { pages: {} } }));
        return {};
      },
    }
  );
};
