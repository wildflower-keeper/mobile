import {useQuery, useMutation} from '@tanstack/react-query';
import {getAccessToken} from '@/utils/api/auth';
import {useEffect, useState} from 'react';
import type {locationStatusType} from '@/hooks/queries/useScan';

const useLocation = () => {
  const [token, setToken] = useState<string>('');
  useEffect(() => {
    (async () => {
      const data = await getAccessToken();
      if (data) setToken(data);
    })();
  }, []);

  const {data} = useQuery({
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
      return result;
    },
  });

  const mutate = useMutation({
    mutationKey: ['location'],
    mutationFn: async (newLocationStatus: locationStatusType) => {
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
    onMutate: (newLocationStatus: locationStatusType) => {
      console.log('onMutate', newLocationStatus);
    },
    onSuccess: () => {
      console.log('location 변경 성공');
    },
  });

  return {data, mutate};
};

export default useLocation;
