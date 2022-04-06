import { createContext, FC, useContext, useState } from 'react';

const useAuthContextController = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);

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

  return {
    authenticate,
    authToken,
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
