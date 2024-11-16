import {Location} from '@/types/Location';
import {useEffect, useState} from 'react';
import {Linking} from 'react-native';

const useScan = () => {
  const [deepLinkData, setDeepLinkData] = useState<Location>({
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
        }
      }
    };
    // 딥링크로 열리지만 앱이 실행중일 때
    const linkEvent = Linking.addEventListener('url', handleDeepLink);

    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink({url});
      }
    });
    // 딥링크 클린업 함수
    return () => {
      linkEvent.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    deepLinkData,
  };
};
export default useScan;
