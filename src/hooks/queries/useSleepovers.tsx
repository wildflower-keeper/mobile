// Utils
import {GET} from '@/utils/api/api';
import {useQuery} from '@tanstack/react-query';
import {formatUpdateTime} from '@/utils/date/date';
import {differenceInDays} from 'date-fns';
import {useAuthStore} from '@/providers/AuthProvider';
import { OvernightListResponseType } from '@/utils/api/type';

const useSleepovers = () => {
  const {token} = useAuthStore();
  const {data} = useQuery<OvernightListResponseType[]>({
    queryKey: ['sleepovers'],
    enabled: !!token,
    queryFn: async () => {
      const response = await GET<OvernightListResponseType[]>(
        '/api/v1/homeless-app/sleepovers',
      );
      const {status, statusText, data: result} = response;
      if (status !== 200) {
        throw new Error(statusText);
      }

      if (!result) {
        throw new Error('SleepoverList is missing from the response');
      }
      return result;
    },
  });

  return {data};
};

export default useSleepovers;