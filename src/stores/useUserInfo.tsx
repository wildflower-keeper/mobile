import {SleepoverType} from '@/components/SleepoverScheduleContainer';
import {create} from 'zustand';

export type userInfoType = {
  id: number;
  shelterId: number;
  homelessName: string;
  shelterName: string;
  shelterPhone: string;
  upcomingSleepover: SleepoverType;
};

type userInfoStoreType = {
  userInfo: userInfoType;
  setUserInfo: (userInfo: userInfoType) => void;
};

const useUserInfoStore = create<userInfoStoreType>(set => ({
  userInfo: {
    id: 0,
    shelterId: 0,
    homelessName: '',
    shelterName: '',
    shelterPhone: '',
    upcomingSleepover: {
      endDate: '',
      nightCount: 0,
      sleepoverId: 0,
      startDate: '',
      status: false,
    },
  },
  setUserInfo: newUserInfo => set(() => ({userInfo: {...newUserInfo}})),
}));

export default useUserInfoStore;
