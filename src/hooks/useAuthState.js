import { onAuthStateChanged } from "firebase/auth";
import { useQuery } from "react-query";
import { auth } from "../config/firebaseConfig";

export const getAuthState = async () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        resolve(user); // Resolve with user or null
      },
      (error) => {
        reject(error); // Reject the promise if there's an error
      }
    );

    return () => unsubscribe();
  });
};

export const useAuthState = () => {
  return useQuery(
    { queryKey: "authState", queryFn: getAuthState },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchInterval: false,
    }
  );
};
