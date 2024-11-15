// Utils
import {GET} from '@/utils/api/api';
import {useQuery} from '@tanstack/react-query';
import {formatUpdateTime} from '@/utils/date/date';
import {differenceInDays} from 'date-fns';
import {useAuthStore} from '@/providers/AuthProvider';

interface OvernightListResponseType {
  startDate: string;
  endDate: string;
  reason: string;
  sleepoverId: number;
  cancelable: boolean;
  dayDiff: number;
}

const useSleepovers = () => {
  const {token} = useAuthStore();
  const {data} = useQuery<OvernightListResponseType[]>({
    queryKey: ['sleepovers'],
    enabled: !!token,
    queryFn: async () => {
      const response = await GET('/api/v1/homeless-app/sleepovers');
      const {status, statusText, data: result} = response;
      if (status !== 200) {
        throw new Error(statusText);
      }

      if (!result) {
        throw new Error('SleepoverList is missing from the response');
      }

      return result.map(({startDate: startDateStr, endDate: endDateStr, ...props}) => {
        const startDate = new Date(startDateStr);
        return {
          dayDiff: differenceInDays(startDate, new Date()),
          startDate: formatUpdateTime(startDate),
          endDate: formatUpdateTime(new Date(endDateStr)),
          ...props
        }
      });
    },
  });

  return {data};
};

export default useSleepovers;
