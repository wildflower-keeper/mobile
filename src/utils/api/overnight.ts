import {backendAxiosInstance} from './api';
import {getAccessToken} from './auth';

const createOvernightSchedule = async ({body}) => {
  const axiosObject = {
    method: 'post',
    url: '/api/v1/homeless-app/sleepover',
    data: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json',
      accept: '*/*',
      'auth-token': await getAccessToken(),
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
      'auth-token': await getAccessToken(),
    },
  };
  const {data} = await backendAxiosInstance(axiosObject);
  return data;
};

export {createOvernightSchedule, getOvernightAbleSchedule};
