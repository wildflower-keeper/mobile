import {GET, POST} from '@/utils/api/api';
import {useAuthStore} from '@/providers/AuthProvider';

// 이 함수가 성공하면 리다이렉트.
const createUser = async ({body}: {body: unknown}) => {
  const {data} = await POST('/api/v1/homeless-app/homeless', {
    body: JSON.stringify(body),
  });
  return data;
};

const getUserInfo = async () => {
  const {data} = await GET('/api/v1/homeless-app/homeless');
console.log("getUserInfo", data);
  return data;
};

export {createUser, getUserInfo};
