import {create} from 'zustand';

type overnightRequestValuesType = {
  startDate: string;
  endDate: string;
  reason: string;
  emergencyContact: string;
};

type useOvernightRequestStoreType = {
  overnightRequestValues: overnightRequestValuesType;
  setOvernightRequestValues: (values: overnightRequestValuesType) => void;
};

const useOvernightRequestStore = create<useOvernightRequestStoreType>(set => ({
  overnightRequestValues: {
    startDate: '',
    endDate: '',
    reason: '',
    emergencyContact: '',
  },
  setOvernightRequestValues: (values: overnightRequestValuesType) =>
    set(() => ({overnightRequestValues: {...values}})),
}));

export default useOvernightRequestStore;
