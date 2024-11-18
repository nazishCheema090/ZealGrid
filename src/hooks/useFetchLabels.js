import { useQuery } from 'react-query';
import { fetchLabelsFromDatabase } from '../lib/utils/labelsApi';
import { useDispatch } from 'react-redux';
import { setLabels } from '../redux/slice/labelsSlice';

export const useFetchLabels = (projectName) => {
  const dispatch = useDispatch();

  return useQuery(['labels', projectName], () => fetchLabelsFromDatabase(projectName), {
    onSuccess: (data) => {
      dispatch(setLabels({ projectName, labels: data }));
    },
  });
};
