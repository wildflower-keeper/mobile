// AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

import {getUserInfo} from '@/utils/api/auth';
import { userInfoType } from '@/stores/useUserInfo';

interface AuthContextType {
  user: userInfoType;
  initializeUser: () => Promise<void>;
  fetchUserInfo: () => Promise<userInfoType | null>;
}

const userContext = createContext<AuthContextType | undefined>(undefined);

export const UserProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<userInfoType>({
    id: 0,
    shelterId: 0,
    homelessName: '',
    shelterName: '',
    shelterPhone: '',
    upcomingSleepover: {
      endDate: '',
      sleepoverId: 0,
      startDate: '',
      status: false,
    },
  });

  const initializeUser = async () => {
    const user = await fetchUserInfo();
    if(user) {
      setUser(user);
    }
  };

  const fetchUserInfo = async () => {
    const data = await getUserInfo();
    return data;
  };

  useEffect(() => {
    initializeUser();
  }, []);

  return (
    <userContext.Provider value={{user, initializeUser, fetchUserInfo}}>
      {children}
    </userContext.Provider>
  );
};

export const useUserStore = () => {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error('userStore must be used within an AuthProvider');
  }
  return context;
};
