import { createContext, FC, useContext } from 'react';
import { useLocalStorage } from 'react-use';
import { LocalStorageKeys } from '../enums/local-storage-keys';

const useAuthContextController = () => {
  const [authToken, setAuthToken] = useLocalStorage(LocalStorageKeys.AUTH_TOKEN, null);

  const authenticate = async (username: string, password: string) => {
    const res = await fetch('/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!res.ok) {
      throw new Error('Authentication failed');
    }

    const { token } = await res.json();
    setAuthToken(token);
  };

  const logout = () => {
    setAuthToken(null);
  };

  return {
    authenticate,
    logout,
    authToken,
    isAuthenticated: authToken !== null,
  };
};

const AuthContext = createContext<ReturnType<typeof useAuthContextController> | null>(null);

const AuthProvider: FC = ({ children }) => {
  const value = useAuthContextController();

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export default AuthProvider;
