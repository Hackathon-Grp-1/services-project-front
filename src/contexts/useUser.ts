import { useAuth } from './AuthContext';
import type { User } from '../api/authApi';

/**
 * Custom hook to access the current user data throughout the application
 * @returns The current user or null if not authenticated
 */
export const useUser = (): User | null => {
  const { user } = useAuth();
  return user;
};

/**
 * Hook to check if the current user has a specific role
 * @param roleName The name of the role to check
 * @returns Boolean indicating if the user has the specified role
 */
export const useHasRole = (roleName: string): boolean => {
  const user = useUser();
  return user?.role?.name === roleName;
};

/**
 * Hook to check if the current user has a specific role type
 * @param roleType The type of the role to check (e.g., 'ADMIN', 'CUSTOMER')
 * @returns Boolean indicating if the user has the specified role type
 */
export const useHasRoleType = (roleType: string): boolean => {
  const user = useUser();
  return user?.role?.type === roleType;
};
