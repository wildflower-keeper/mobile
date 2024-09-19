import {getUserInfo} from '@/utils/api/auth';
import {useQuery} from '@tanstack/react-query';

const useGetUserInfo = () => {
  const {data, isSuccess, isError, isPending} = useQuery({
    queryKey: ['userInfo', 'homeless'],
    queryFn: getUserInfo,
  });

  return {data, isSuccess, isError, isPending};
};

export {useGetUserInfo};
