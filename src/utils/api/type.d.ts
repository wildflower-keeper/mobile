export type GetOvernightAbleScheduleResponseType = string[] | null;

export interface ShelterListType {
    shelterId: string
    shelterName: string
}

type SleepoverType = {
  endDate: string;
  sleepoverId: number;
  startDate: string;
  status: boolean;
};

export type userInfoType = {
  id: number;
  shelterId: number;
  homelessName: string;
  shelterName: string;
  shelterPhone: string;
  upcomingSleepover: SleepoverType;
};

export interface OvernightListResponseType {
  startDate: string;
  endDate: string;
  reason: string;
  sleepoverId: number;
  cancelable: boolean;
}