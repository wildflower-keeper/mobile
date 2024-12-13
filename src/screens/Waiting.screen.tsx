import {HomeStackParamList} from '@/types/Stack';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Alert} from 'react-native';

const Waiting = () => {
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  Alert.alert('준비 중 입니다.', '', [
    {
      text: '확인',
      onPress: () => {
        navigation.navigate('홈');
      },
    },
  ]);
  return <></>;
};

export default Waiting;
