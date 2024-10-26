// Utils
import {getAccessToken} from '@/utils/api/auth';
import {useQuery} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {formatUpdateTime} from '@/utils/date/date';
import {differenceInDays} from 'date-fns';

interface OvernightListResponseType {
  startDate: string;
  endDate: string;
  reason: string;
  sleepoverId: number;
  cancelable: boolean;
  dayDiff: number;
}

const useSleepovers = () => {
  const [token, setToken] = useState<string>('');
  useEffect(() => {
    (async () => {
      const data = await getAccessToken();
      if (data) {
        setToken(data);
      }
    })();
  }, []);
  const {data} = useQuery<OvernightListResponseType[]>({
    queryKey: ['sleepovers'],
    enabled: !!token,
    queryFn: async () => {
      const response: Response = await fetch(
        'https://api.wildflower-gardening.com/api/v1/homeless-app/sleepovers',
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            accept: '*/*',
            'auth-token': token,
          },
        },
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

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