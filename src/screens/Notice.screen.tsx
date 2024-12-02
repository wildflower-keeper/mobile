import Header from '@/components/Header';
import Notices from '@/components/Notice';
import {HomeStackParamList} from '@/navigations/HomeStackNavigator';
import {NoticeMessage} from '@/types/NoticeMessage';
import {GET} from '@/utils/api/api';
import {NavigationProp} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {useMemo} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

interface NoticeProp {
  navigation: NavigationProp<HomeStackParamList>;
}

const NoticePage = ({navigation}: NoticeProp) => {
  const {data: noticesMap} = useQuery({
    queryKey: ['notices'],
    queryFn: async () =>
      await GET<{
        [date: string]: NoticeMessage[];
      }>('/api/v2/homeless-app/notice').then(response => response.data),
  });

  const notices = useMemo(() => {
    if (!noticesMap) {
      return [];
    }
    const resultArray: NoticeMessage[][] = [];
    const keys = Object.keys(noticesMap);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      resultArray[i] = noticesMap[key];
    }

    return resultArray;
  }, [noticesMap]);

  return (
    <>
      <Header onClickBack={() => navigation.navigate('Home')}>알림</Header>
      <ScrollView style={styles.scheduleListContainer}>
        <Notices title="오늘" messages={notices[0]} />
        <Notices title="어제" messages={notices[1]} />
        <Notices title="지난 알림" messages={notices[2]} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scheduleListContainer: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default NoticePage;
