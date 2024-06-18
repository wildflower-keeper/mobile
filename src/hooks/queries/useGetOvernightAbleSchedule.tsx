import {getOvernightAbleSchedule} from '@/utils/api/overnight';
import {useQuery} from '@tanstack/react-query';

const useGetOvernightAbleSchedule = () => {
  const {data, isSuccess, isError, isPending} = useQuery({
    queryKey: ['overnightAbleSchedule'],
    queryFn: getOvernightAbleSchedule,
    staleTime: 1000 * 60 * 60,
  });
  return [data, isSuccess, isError, isPending];
};

export default useGetOvernightAbleSchedule;
