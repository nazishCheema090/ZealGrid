import { useQuery } from "react-query";
import { get, ref } from "firebase/database";
import { database } from "../config/firebaseConfig";

const fetchProjects = async () => {
  try {
    const projectRef = ref(database);
    const snapshot = await get(projectRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.keys(data).map((key) => ({
        id: key,
        name: key,
        ...data[key],
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching projects: ", error.message);
  }
};

export const useFetchProjects = () => {
  return useQuery(["projects"], fetchProjects, {
    staleTime: 60000,
    cacheTime: 300000,
    refetchOnWindowFocus: false,
  });
};
