import Header from '@/components/Header';
import Notices from '@/components/Notice';
import {HomeStackParamList} from '@/navigations/HomeStackNavigator';
import {AppPush} from '@/types/PushMessage';
import {NavigationProp} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

interface NoticeProp {
  navigation: NavigationProp<HomeStackParamList>;
}

const Notice = ({navigation}: NoticeProp) => {
  const {data: notices} = useQuery<AppPush[][]>({
    queryKey: ['notices'],
    queryFn: () => {
      //TODO API 연동 후 수정 -> notices 변수로 아래 화면 구성하도록
      const todayMessages = [
        {
          title: '상수도 노후관 교체 공사 안내',
          body: '공사로 인한 소음 및 교통불편에 대한 여러분의 협조와 이해를 부탁드립니다.',
          isRead: false,
          data: {screen: 'notice', noticeId: 0},
          createdAt: '2024.10.03',
        },
      ];
      const yesterdayMessage = [
        {
          title: '서울시 일자리 관련 안내',
          body: '어제의 알림입니다.',
          isRead: true,
          data: {screen: 'notice', noticeId: 0},
          createdAt: '2024.10.02',
        },
        {
          title: '센터 복귀 30분 전 알림',
          body: '테스트 메세지입니다.',
          isRead: false,
          data: {screen: 'notice', noticeId: 0},
          createdAt: '2024.10.02',
        },
      ];
      const prevMessages = [
        {
          title: '보금자리 관련 안내',
          body: '테스트 메세지입니다.',
          isRead: true,
          data: {screen: 'notice', noticeId: 0},
          createdAt: '2024.10.01',
        },
      ];
      return [todayMessages, yesterdayMessage, prevMessages];
    },
    // queryFn: async () => await GET('/api/v2/shelter-admin/notice'), // TODO 백엔드 API 완료되면 교체해야 함
  });

  const messages = notices ?? [[], [], []];

  return (
    <>
      <Header onClickBack={() => navigation.navigate('Home')}>알림</Header>
      <ScrollView style={styles.scheduleListContainer}>
        <Notices title="오늘" messages={messages[0]} />
        <Notices title="어제" messages={messages[1]} />
        <Notices title="지난 알림" messages={messages[2]} />
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

export default Notice;
