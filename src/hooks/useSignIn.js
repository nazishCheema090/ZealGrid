import { signInWithEmailAndPassword } from "firebase/auth";
import { useMutation, useQueryClient } from "react-query";
import { auth } from "../config/firebaseConfig";

const signIn = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

export const useSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation(signIn, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "authState" });
    },
  });
};
