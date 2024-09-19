import {useMutation, useQuery} from '@tanstack/react-query';
import {useCallback, useEffect, useState} from 'react';
import {Linking} from 'react-native';
import {getAccessToken} from '@/utils/api/auth';

export type locationStatusType = 'IN_SHELTER' | 'OUT_SHELTER' | '';

const useScan = () => {
  const [deepLinkData, setDeepLinkData] = useState<{
    locationStatus: locationStatusType;
  }>({
    locationStatus: '',
  });
  useEffect(() => {
    const handleDeepLink = async (event: {url: string}) => {
      const url = event.url;
      // 딥링크에서 쿼리 파라미터 추출
      const qrDataParams = url.split('?')[1];
      if (qrDataParams !== undefined) {
        const locationStatusParam = qrDataParams.split('=')[1];
        if (
          locationStatusParam === 'IN_SHELTER' ||
          locationStatusParam === 'OUT_SHELTER'
        ) {
          setDeepLinkData({
            ...deepLinkData,
            locationStatus: locationStatusParam,
          });
          // console.log('locationStatus', locationStatusParam);
        }
      }
    };
    // 딥링크로 열리지만 앱이 실행중일 때
    const linkEvent = Linking.addEventListener('url', handleDeepLink);

    Linking.getInitialURL().then(url => {
      if (url) {
        // console.log('deep link 로 열림', url);
        handleDeepLink({url});
      }
    });
    // 딥링크 클린업 함수
    return () => {
      linkEvent.remove();
    };
  }, []);

  // const mutate = useMutation<{
  //   locationStatus: locationStatusType;
  // }>({
  //   mutationKey: ['scan'],
  //   mutationFn: async () => {
  //     const response = await fetch(
  //       'https://api.wildflower-gardening.com/api/v1/homeless-app/location',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           accept: '*/*',
  //           'auth-token': token,
  //         },

  //         body: JSON.stringify({locationStatus}),
  //       },
  //     );
  //     const result = await response.json();
  //     console.log('data', result);
  //     return result;
  //   },
  //   // staleTime: 0,
  //   // gcTime: 0,
  // });

  return {
    deepLinkData,
  };
};
export default useScan;
