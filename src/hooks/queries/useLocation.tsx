import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {GET, POST} from '@/utils/api/api';
import {Location, LocationStatusType} from '@/types/Location';

const useLocation = (token: string) => {
  const queryClient = useQueryClient();

  const {data} = useQuery<Location>({
    queryKey: ['location'],
    enabled: !!token,
    queryFn: async () => {
      if (!token) {
        throw new Error('Token is missing');
      }

      const response = await GET<Location>('/api/v1/homeless-app/location');
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      const result = response.data;

      // 서버 응답 확인 (필요시 에러 처리)
      if (!result?.locationStatus) {
        throw new Error('Location status is missing from the response');
      }
      return result;
    },
  });

  const mutate = useMutation({
    mutationKey: ['location'],
    mutationFn: (newLocationStatus: LocationStatusType) => {
      return POST('/api/v1/homeless-app/location', {
        body: JSON.stringify({locationStatus: newLocationStatus}),
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
