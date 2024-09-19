import {getUserInfo} from '@/utils/api/auth';
import {useQuery} from '@tanstack/react-query';

const useGetUserInfo = () => {
  console.log('useGetUserInfo react query function called');
  const {data, isSuccess, isError, isPending} = useQuery({
    queryKey: ['userInfo', 'homeless'],
    queryFn: async () => {
      console.log('queryFn fetch data');
      const response = await fetch(
        'https://api.wildflower-gardening.com/api/v1/homeless-app/homeless',
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            accept: '*/*',
            'auth-token':
              'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiI5IiwiaG9tZWxlc3NOYW1lIjoi7YWM7Iqk7Yq46rOE7KCVIiwiaG9tZWxlc3NJZCI6IjkiLCJzaGVsdGVySWQiOiIxIiwiaWF0IjoxNzI2NjI2NzY2fQ.DJt_NG2F0xpYd_XsLtE9Vz89YtR1N-Od6VGi_6updYw4_JEEKvQ3DXq0jdGpnQnK',
          },
        },
      );
      console.log(response);
      return response.json();
    },
    // staleTime: 1000 * 60 * 60,
  });

  return {data, isSuccess, isError, isPending};
};

export {useGetUserInfo};
