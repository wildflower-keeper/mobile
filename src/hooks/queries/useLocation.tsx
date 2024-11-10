import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import type {locationStatusType} from '@/hooks/queries/useScan';

const useLocation = (token : string) => {
  const queryClient = useQueryClient();

  const {data} = useQuery<{
    locationStatus: locationStatusType;
  }>({
    queryKey: ['location'],
    enabled: !!token,
    queryFn: async () => {
      if (!token) throw new Error('Token is missing');

      const response = await fetch(
        'https://api.wildflower-gardening.com/api/v1/homeless-app/location',
        {
          method: 'GET',
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
      return fetch(
        'https://api.wildflower-gardening.com/api/v1/homeless-app/location',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accept: '*/*',
            'auth-token': token,
          },
          body: JSON.stringify({locationStatus: newLocationStatus}),
        },
      );
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
