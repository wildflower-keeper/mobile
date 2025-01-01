import {GET, POST} from '@/utils/api/api';
import { userInfoType } from './type';

// 이 함수가 성공하면 리다이렉트.
const createUser = async ({body}: {body: unknown}) => {
  const {data} = await POST('/api/v1/homeless-app/homeless', {
    body: JSON.stringify(body),
  });
  return data;
};

const getUserInfo = async (): Promise<userInfoType | null> => {
  const {data} = await GET<userInfoType>('/api/v1/homeless-app/homeless');
  return data;
};

export {createUser, getUserInfo};
