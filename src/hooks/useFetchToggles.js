import { useQuery } from 'react-query';
import { fetchTogglesFromDatabase } from '../lib/utils/togglesApi';
import { useDispatch } from 'react-redux';
import { setToggles } from '../redux/slice/togglesSlice';

export const useFetchToggles = (projectName) => {
  const dispatch = useDispatch();

  return useQuery(['toggles', projectName], () => fetchTogglesFromDatabase(projectName), {
    onSuccess: (data) => {
      dispatch(setToggles({ projectName, toggles: data }));
    },
  });
};
