import {GET, POST, DELETE} from './api';
import { GetOvernightAbleScheduleResponseType } from './type';

const createOvernightSchedule = async ({body}) => {
  const {data} = await POST('/api/v1/homeless-app/sleepover', {
    body: JSON.stringify(body)
  });
  return data;
};

const getOvernightAbleSchedule = async () => {
  const {data} = await GET<GetOvernightAbleScheduleResponseType>('/api/v1/homeless-app/available-sleepover-dates');
  return data;
};

const deleteOvernightSchedule = async (sleepoverId: number) => {
  await DELETE(`/api/v1/homeless-app/sleepover/${sleepoverId}`);
};

export {
  createOvernightSchedule,
  getOvernightAbleSchedule,
  deleteOvernightSchedule,
};
