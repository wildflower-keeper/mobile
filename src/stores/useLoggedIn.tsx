import {create} from 'zustand';

type useLoginType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLogin: boolean) => void;
};

const useLoggedInStore = create<useLoginType>(set => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLogin: boolean) => set(() => ({isLoggedIn: isLogin})),
}));

export default useLoggedInStore;
