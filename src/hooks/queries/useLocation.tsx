import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {getAccessToken} from '@/utils/api/auth';
import {GET, POST} from '@/utils/api/api';
import {useEffect, useState} from 'react';
import type {locationStatusType} from '@/hooks/queries/useScan';

const useLocation = () => {
  const [token, setToken] = useState<string>('');
  const queryClient = useQueryClient();
  useEffect(() => {
    (async () => {
      const data = await getAccessToken();
      if (data) setToken(data);
    })();
  }, []);

  const {data} = useQuery<{
    locationStatus: locationStatusType;
  }>({
    queryKey: ['location'],
    enabled: !!token,
    queryFn: async () => {
      if (!token) throw new Error('Token is missing');

      const response = await GET('/api/v1/homeless-app/location', {
          headers: {
            'Content-Type': 'application/json',
            accept: '*/*',
            'auth-token': token,
          },
        });

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      const result = response.data;

      // 서버 응답 확인 (필요시 에러 처리)
      if (!result.locationStatus) {
        throw new Error('Location status is missing from the response');
      }
      return result;
    },
  });

  const mutate = useMutation({
    mutationKey: ['location'],
    mutationFn: (newLocationStatus: locationStatusType) => {
      return POST('/api/v1/homeless-app/location', {
          headers: {
            'Content-Type': 'application/json',
            accept: '*/*',
            'auth-token': token,
          },
          body: JSON.stringify({locationStatus: newLocationStatus})
        });
    },
    onError: error => {
      console.error('Error:', error);
    },
    onSuccess: () => {
      console.log('location 변경 성공');
      queryClient.invalidateQueries({queryKey: ['location']});
    },
  });

  return {data, mutate};
};

export default useLocation;
