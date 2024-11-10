import {useEffect, useMemo, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeStackParamList} from '@/navigations/HomeStackNavigator';
import useScan from '@/hooks/queries/useScan';
import useLocation from '@/hooks/queries/useLocation';
import {locationStatusType} from '@/hooks/queries/useScan';
import Toast from 'react-native-toast-message';
import {useAuthStore} from '@/providers/AuthProvider';

type navigationProps = NavigationProp<HomeStackParamList>;

const MUTATE_STATUS_ARR: locationStatusType[] = ['IN_SHELTER', 'OUT_SHELTER'];
const ScanResult = () => {
  const navigation = useNavigation<navigationProps>();
  const {deepLinkData} = useScan();
  const {token} = useAuthStore();
  const {mutate} = useLocation(token);
  const toast = useMemo(() => {
    if (deepLinkData.locationStatus === 'IN_SHELTER') {
      return {icon: 'check', message: '재실로 전환되었습니다.'};
    }
    if (deepLinkData.locationStatus === 'OUT_SHELTER') {
      return {icon: 'check', message: '외출로 전환되었습니다.'};
    }
    return {icon: 'exclamationcircleo', message: '다시 시도해주세요.'};
  }, [deepLinkData]);

  useEffect(() => {
    const {locationStatus} = deepLinkData;
    if (MUTATE_STATUS_ARR.includes(locationStatus) && !!token) {
      mutate.mutate(locationStatus);

      Toast.show({
        type: 'info',
        text1: toast.message,
        position: 'bottom',
        bottomOffset: 90,
        props: {icon: toast.icon},
      });
    }
    navigation.navigate('Home');
  }, [deepLinkData, token]);

  return null;
};

export default ScanResult;
