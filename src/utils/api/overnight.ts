import {GET, POST, DELETE} from './api';
import authStore from '@/utils/tokenStorage/tokenStorage';

const createOvernightSchedule = async ({body}) => {
  const {data} = await await POST('/api/v1/homeless-app/sleepover', {
    body: JSON.stringify(body)
  });
  return data;
};

const getOvernightAbleSchedule = async () => {
  const {data} = await await GET('/api/v1/homeless-app/available-sleepover-dates', {
    body: JSON.stringify(body)
  });
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
