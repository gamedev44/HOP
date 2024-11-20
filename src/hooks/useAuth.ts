import { useUser, useClerk } from "@clerk/clerk-react";
import { useStore } from '../store/useStore';

export const useAuth = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { setCurrentUser } = useStore();

  const logout = async () => {
    await signOut();
    setCurrentUser(null);
  };

  return {
    user,
    logout,
    isAuthenticated: !!user
  };
};