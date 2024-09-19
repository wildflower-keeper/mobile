import {useQuery} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {Linking} from 'react-native';
import {getAccessToken} from '@/utils/api/auth';

type locationStatusType = 'IN_SHELTER' | 'OUT_SHELTER';

const useScan = () => {
  const [locationStatus, setLocationStatus] = useState<string>('');
  useEffect(() => {
    const handleDeepLink = async (event: {url: string}) => {
      const url = event.url;
      // 딥링크에서 쿼리 파라미터 추출
      const qrDataParams = url.split('?')[1];
      if (qrDataParams !== undefined) {
        const locationStatusParam = qrDataParams.split('=')[1];

        if (locationStatusParam === 'IN_SHELTER') {
          setLocationStatus('재실');
        } else if (locationStatusParam === 'OUT_SHELTER') {
          setLocationStatus('외출');
        }
      }
    };

    // 앱이 열릴 때 딥링크 처리
    const linkEvent = Linking.addEventListener('url', handleDeepLink);

    // 이미 열려 있는 앱에서 딥링크로 진입한 경우 처리
    Linking.getInitialURL().then(url => {
      if (url) {
        console.log('run (앱이 열려있는 경우)getInitialURL deep link');
        handleDeepLink({url});
      }
    });

    // 딥링크 클린업 함수
    return () => {
      linkEvent.remove();
    };
  }, []);

  const {data, isLoading, isError, isFetched} = useQuery<{
    locationStatus: locationStatusType;
  }>({
    queryKey: ['scan'],
    enabled: locationStatus !== '',
    queryFn: async () => {
      console.log('queryFn fetch data');
      const response = await fetch(
        'https://api.wildflower-gardening.com/api/v1/homeless-app/location',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accept: '*/*',
            'auth-token': `${await getAccessToken()}`,
          },

          body: JSON.stringify({locationStatus}),
        },
      );
      return response.json();
    },
    staleTime: 0,
  });

  return {data, isLoading, isError, locationStatus, isFetched};
};
export default useScan;
