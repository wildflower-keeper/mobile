import {GET, POST, DELETE} from './api';
import {getAccessToken} from './auth';


//TODO : body type 정의
const createOvernightSchedule = async ({body}) => {
  return (await POST('/api/v1/homeless-app/sleepover', {
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json',
        accept: '*/*',
        'auth-token': await getAccessToken(),
      }
    })).data;
};

const getOvernightAbleSchedule = async () => {
  return (await GET('/api/v1/homeless-app/available-sleepover-dates', {
      headers: {
        accept: '*/*',
        'auth-token': await getAccessToken(),
      },
    })).data;
};

const deleteOvernightSchedule = async (sleepoverId: number) => {
  await DELETE(`/api/v1/homeless-app/sleepover/${sleepoverId}`, {
      headers: {
        accept: '*/*',
        'auth-token': await getAccessToken(),
      },
    });
};

export {
  createOvernightSchedule,
  getOvernightAbleSchedule,
  deleteOvernightSchedule,
};
