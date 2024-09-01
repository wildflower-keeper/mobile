import {getUserInfo} from '@/utils/api/auth';
import {useQuery} from '@tanstack/react-query';

const useGetUserInfo = () => {
  const {data, isSuccess, isError, isPending} = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    staleTime: 1000 * 60 * 60,
  });

  return [data, isSuccess, isError, isPending];
};

export {useGetUserInfo};
