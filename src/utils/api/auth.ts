import DeviceInfo from 'react-native-device-info';
import {GET, POST} from '@/utils/api/api';
import {getToken} from '../tokenStorage/tokenStorage';

const getDeviceUniqueId = async () => {
  return await DeviceInfo.getUniqueId();
};

const getAccessToken = async () => {
  return await getToken(await getDeviceUniqueId());
};

// TODO : createUser 사용처가 없는 것 같은데 확인 필요
// 이 함수가 성공하면 리다이렉트.
const createUser = async ({ body }) => {
  const {data} = await POST('/api/v1/homeless-app/homeless', {
    headers: { 'content-type': 'application/json', accept: '*/*' },
    body: JSON.stringify(body),
  });
return data;
};

const getUserInfo = async () => {
  console.log('get user info');
  const {data} = await GET('/api/v1/homeless-app/homeless', {
    headers: {
      'content-type': 'application/json',
      'auth-token': await getAccessToken(),
    },
  });
  return data;
};

export {getDeviceUniqueId, createUser, getUserInfo, getAccessToken};
