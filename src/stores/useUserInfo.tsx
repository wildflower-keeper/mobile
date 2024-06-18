import {create} from 'zustand';

export type userInfoType = {
  id: number;
  name: string;
  shelterName: string;
  targetDateTime: string;
  yesterdaySleepoverExists: boolean;
  todaySleepoverExists: boolean;
  futureSleepoverExists: boolean;
};

type userInfoStoreType = {
  userInfo: userInfoType;
  setUserInfo: (userInfo: userInfoType) => void;
};

const useUserInfoStore = create<userInfoStoreType>(set => ({
  userInfo: {
    id: 0,
    name: '',
    shelterName: '',
    targetDateTime: '',
    yesterdaySleepoverExists: false,
    todaySleepoverExists: false,
    futureSleepoverExists: false,
  },
  setUserInfo: newUserInfo => set(state => ({...state, ...newUserInfo})),
}));

export default useUserInfoStore;
