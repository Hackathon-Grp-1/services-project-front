import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { login as apiLogin, logout as apiLogout, isAuthenticated, getCurrentUser } from '../api/authApi';
import type { LoginCredentials, AuthResponse } from '../api/authApi';

interface AuthContextType {
  isLoggedIn: boolean;
  user: any | null;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isAuthenticated());
  const [user, setUser] = useState<any | null>(getCurrentUser());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication status on component mount
    setIsLoggedIn(isAuthenticated());
    setUser(getCurrentUser());
  }, []);

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiLogin(credentials);
      setIsLoggedIn(true);
      setUser(response.user);
      setLoading(false);
      return response;
    } catch (err: any) {
      setLoading(false);
      const errorMessage = err.response?.data?.message || 'Une erreur est survenue lors de la connexion';
      setError(errorMessage);
      throw err;
    }
  };

  const logout = () => {
    apiLogout();
    setIsLoggedIn(false);
    setUser(null);
  };
  // Mémoriser les valeurs du contexte pour éviter des re-rendus inutiles
  const contextValue = useMemo(() => ({
    isLoggedIn,
    user,
    login,
    logout,
    loading,
    error
  }), [isLoggedIn, user, loading, error]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};
