import DeviceInfo from 'react-native-device-info';
import {backendAxiosInstance} from './api';
import {getToken} from '../tokenStorage/tokenStorage';

const getDeviceUniqueId = async () => {
  return await DeviceInfo.getUniqueId();
};

const getAccessToken = async () => {
  return await getToken(await getDeviceUniqueId());
};

// 이 함수가 성공하면 리다이렉트.
const createUser = async ({body}) => {
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
      accept: '*/*',
      'auth-token': await getAccessToken(),
    },
    url: '/api/v1/homeless-app/homeless',
  });
  return data;
};

export {getDeviceUniqueId, createUser, getUserInfo, getAccessToken};
