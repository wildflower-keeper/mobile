import {upcomingSleepoverType} from '@/components/SleepoverScheduleContainer';
import {create} from 'zustand';

export type userInfoType = {
  id: number;
  sleepoverId: number;
  shelterId: number;
  homelessName: string;
  shelterName: string;
  upcomingSleepover: upcomingSleepoverType;
};

type userInfoStoreType = {
  userInfo: userInfoType;
  setUserInfo: (userInfo: userInfoType) => void;
};

const useUserInfoStore = create<userInfoStoreType>(set => ({
  userInfo: {
    id: 0,
    sleepoverId: 0,
    shelterId: 0,
    homelessName: '',
    shelterName: '',
    upcomingSleepover: {
      endDate: '',
      nightCount: 0,
      sleepoverId: 0,
      startDate: '',
      status: '',
    },
  },
  setUserInfo: newUserInfo => set(() => ({userInfo: {...newUserInfo}})),
}));

export default useUserInfoStore;
