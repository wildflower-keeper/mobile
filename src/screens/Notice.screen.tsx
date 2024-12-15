import Header from '@/components/Header';
import Notices from '@/components/Notice';
import {HomeStackParamList} from '@/types/Stack';
import {NoticeMessage} from '@/types/NoticeMessage';
import {GET} from '@/utils/api/api';
import {NavigationProp} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {differenceInDays} from 'date-fns';

type MessageGroupKey = 'today' | 'yesterday' | 'past';
type MessageGroup = Record<MessageGroupKey, NoticeMessage[]>;

interface NoticeProp {
  navigation: NavigationProp<HomeStackParamList>;
}

const NoticePage = ({navigation}: NoticeProp) => {
  const [messages, setMessages] = useState<MessageGroup>({} as MessageGroup);
  const {data} = useQuery({
    queryKey: ['notices'],
    queryFn: async () =>
      await GET<{
        [date: string]: NoticeMessage[];
      }>('/api/v2/homeless-app/notice').then(response => response.data),
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    const getKey = (dateStr: string) => {
      const diff = differenceInDays(new Date(dateStr), new Date());
      switch (diff) {
        case 0:
          return 'today';
        case -1:
          return 'yesterday';
        default:
          return 'past';
      }
    };

    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      setMessages(prev => {
        const newMessages = {...prev};
        newMessages[getKey(key)] = data[key];
        return newMessages;
      });
    }
  }, [data]);

  return (
    <>
      <Header onClickBack={() => navigation.navigate('Home')}>알림</Header>
      <ScrollView style={styles.scheduleListContainer}>
        <Notices title="오늘" messages={messages.today} />
        <Notices title="어제" messages={messages.yesterday} />
        <Notices title="지난 알림" messages={messages.past} />
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
