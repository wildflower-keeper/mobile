import { create } from 'zustand';

type overnightRequestValuesType = {
  startDate: string;
  endDate: string;
  reason: string;
  emergencyContact: string;
};

type useOvernightRequestStoreType = {
  overnightRequestValues: overnightRequestValuesType;
  setOvernightRequestValues: (values: overnightRequestValuesType) => void;
  deleteTargetId: number;
  setDeleteTargetId: (id: number) => void;
  overnightDuration: string;
  setDuration: (duration: string) => void;
};

const useOvernightRequestStore = create<useOvernightRequestStoreType>(set => ({
  overnightRequestValues: {
    startDate: '',
    endDate: '',
    reason: '',
    emergencyContact: '',
  },
  setOvernightRequestValues: (values: overnightRequestValuesType) =>
    set(() => ({ overnightRequestValues: { ...values } })),
  deleteTargetId: -1,
  setDeleteTargetId: (id) => set((state) => ({ deleteTargetId: id })),
  overnightDuration: "",
  setDuration: (duration) => set((state) => ({overnightDuration: duration}))
}));

export default useOvernightRequestStore;
