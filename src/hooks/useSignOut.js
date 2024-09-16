import { signOut } from "firebase/auth";
import { useMutation, useQueryClient } from "react-query";
import { auth } from "../config/firebaseConfig";
import { toast } from "react-hot-toast";

export const useSignOut = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("error logging out:", error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: "authState" });
        toast.success("Signed out successfully");
      },
      onError: () => {
        toast.error("error Signning out");
      },
    }
  );
};
