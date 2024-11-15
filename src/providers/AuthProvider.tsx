// AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import authStore from '@/utils/tokenStorage/tokenStorage'; // Keychain 통합 모듈 예시\

interface AuthContextType {
  token: string;
  setToken: (newToken: string) => Promise<void>;
  initializeToken: () => Promise<void>;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [token, setTokenState] = useState<string>('');

  const initializeToken = async () => {
    const storedToken = await authStore.getAccessToken();
    setTokenState(storedToken);
  };

  const setToken = async (newToken: string) => {
    await authStore.setToken(newToken);
    setTokenState(newToken);
  };

  const isLoggedIn = token !== '';

  useEffect(() => {
    initializeToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{token, setToken, initializeToken, isLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthStore = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
