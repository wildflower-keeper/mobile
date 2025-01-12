import {getOvernightAbleSchedule} from '@/utils/api/overnight';
import { GetOvernightAbleScheduleResponseType } from '@/utils/api/type';
import {useQuery} from '@tanstack/react-query';

const useGetOvernightAbleSchedule = () => {
  const {data, isSuccess, isError, isPending} = useQuery<GetOvernightAbleScheduleResponseType>({
    queryKey: ['overnightAbleSchedule'],
    queryFn: getOvernightAbleSchedule,
    staleTime: 1000 * 60 * 60,
  });
  return [data, isSuccess, isError, isPending] as const;
};

export default useGetOvernightAbleSchedule;
