import {backendAxiosInstance} from './api';
import {useAuthStore} from '@/providers/AuthProvider';

const {token} = useAuthStore();
// 이 함수가 성공하면 리다이렉트.
const createUser = async ({body}: {body: unknown}) => {
  const {data} = await backendAxiosInstance({
    method: 'POST',
    headers: {'content-type': 'application/json', accept: '*/*'},
    url: '/api/v1/homeless-app/homeless',
    data: JSON.stringify(body),
  });
  return data;
};

const getUserInfo = async () => {
  const {data} = await backendAxiosInstance({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'auth-token': token,
    },
    url: '/api/v1/homeless-app/homeless',
  });
  return data;
};

export {createUser, getUserInfo};
