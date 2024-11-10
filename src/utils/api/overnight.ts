import {backendAxiosInstance} from './api';
import {useAuthStore} from '@/providers/AuthProvider';

//TODO : body type 정의
const {token} = useAuthStore();
const createOvernightSchedule = async ({body}) => {
  const axiosObject = {
    method: 'post',
    url: '/api/v1/homeless-app/sleepover',
    data: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json',
      accept: '*/*',
      'auth-token': token,
    },
  };
  const {data} = await backendAxiosInstance(axiosObject);
  return data;
};

const getOvernightAbleSchedule = async () => {
  const axiosObject = {
    method: 'get',
    url: '/api/v1/homeless-app/available-sleepover-dates',
    headers: {
      accept: '*/*',
      'auth-token': token,
    },
  };
  const {data} = await backendAxiosInstance(axiosObject);
  return data;
};

const deleteOvernightSchedule = async (sleepoverId: number) => {
  const url = `/api/v1/homeless-app/sleepover/${sleepoverId}`;
  await backendAxiosInstance({
    method: 'DELETE',
    url,
    headers: {
      accept: '*/*',
      'auth-token': token,
    },
  });
};

export {
  createOvernightSchedule,
  getOvernightAbleSchedule,
  deleteOvernightSchedule,
};
