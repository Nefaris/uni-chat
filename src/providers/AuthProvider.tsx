import { createContext, FC, useContext } from 'react';
import { useLocalStorage } from 'react-use';
import { CurrentUser } from '../interfaces/current-user.interface';
import { LocalStorageKeys } from '../enums/local-storage-keys';

const useAuthContextController = () => {
  const [authToken, setAuthToken] = useLocalStorage<string | null>(LocalStorageKeys.AUTH_TOKEN, null);
  const [currentUser, setCurrentUser] = useLocalStorage<CurrentUser | null>(LocalStorageKeys.CURRENT_USER, null);

  const authenticate = async (username: string, password: string) => {
    const res = await fetch('https://uni-chat-backend.herokuapp.com/api/auth/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        code: password,
      }),
    });

    if (!res.ok) {
      throw new Error('Authentication failed');
    }

    const data = await res.json();

    setAuthToken(data.access_token);
    setCurrentUser({
      userId: data.user_id,
      username: data.username,
    });
  };

  const logout = () => {
    setAuthToken(null);
  };

  return {
    authenticate,
    logout,
    authToken,
    currentUser,
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
