import CustomText from '@/components/base/CustomText';
import Tag from '@/components/base/Tag';
import WarnIcon from '@/components/icon/WarnIcon';
import PushMessage from '@/components/PushMessage';
import useLocation from '@/hooks/queries/useLocation';
import {useAuthStore} from '@/providers/AuthProvider';
import {useUserStore} from '@/providers/UserProvider';
import {Message, MessageType} from '@/types/NoticeMessage';
import React, {useEffect, useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

type Category = 'all' | MessageType;
const TABS: {label: string; value: Category; priority: number}[] = [
  {label: '전체', value: 'all', priority: -1},
  {label: '공지', value: 'notice', priority: 1},
  {label: '참여조사', value: 'survey', priority: 2},
  {label: '알림', value: 'alerm', priority: 3},
];

const Home = () => {
  const [category, setCategory] = useState<Category>('all');
  const [messages, setMessages] = useState<Message[]>([]); // TODO message 받아오는 로직

  const {user} = useUserStore();
  const {token} = useAuthStore();
  const {data: location} = useLocation(token);
  const locationStatus =
    location?.locationStatus === 'IN_SHELTER' ? '재실 중' : '외출 중';

  useEffect(() => {
    setMessages([
      {
        id: 1,
        title: '상수도 노후관 교체 공사 안내',
        contents: 'asdf',
        sendAt: new Date().toUTCString(),
        read: false,
        type: 'notice',
      },
      {
        id: 2,
        title: '2025 서울시 일자리 워크숍 참여 여부 조사',
        contents: 'asdf',
        sendAt: new Date().toUTCString(),
        read: false,
        type: 'survey',
        isSurvey: true,
        imageUrl:
          'https://fastly.picsum.photos/id/442/200/200.jpg?hmac=S-yNCNr30GK97ulUYoey_Fh2-czIf7YnNgcKp7zrEoE',
      },
      {
        id: 3,
        title: '센터 복귀 30분 전입니다. 6시 40분까지 센터로 복귀해주세요',
        contents: 'asdf',
        sendAt: new Date().toUTCString(),
        read: false,
        type: 'alerm',
      },
      {
        id: 4,
        title: '상수도 노후관 교체 공사 안내2',
        contents:
          '상수도 노후관 교체 공사 안내2 상수도 노후관 교체 공사 안내2 상수도 노후관 교체 공사 \n\n 다음줄 \n\n 안내2 상수도 노후관 교체 공사 안내2 상수도 노후관 교체 공사 안내2',
        sendAt: new Date().toUTCString(),
        read: false,
        type: 'notice',
      },
      {
        id: 5,
        title: '상수도 노후관 교체 공사 안내3',
        contents:
          '상수도 노후관 교체 공사 안내2 상수도 노후관 교체 공사 안내2 상수도 노후관 교체 공사 \n\n 다음줄 \n\n 안내2 상수도 노후관 교체 공사 안내2 상수도 노후관 교체 공사 안내2',
        sendAt: new Date().toUTCString(),
        read: false,
        type: 'alerm',
        imageUrl:
          'https://fastly.picsum.photos/id/141/200/300.jpg?hmac=d8Mh3TnTbeViVLDauKiTRsNX8KAY5RGDbXDwEuecPko',
      },
    ]);
  }, []);

  const filteredMessage = useMemo(() => {
    if (category !== 'all') {
      return messages.filter(message => message.type === category);
    }

    const priorities = TABS.reduce((acc, cur) => {
      acc[cur.value] = cur.priority;
      return acc;
    }, {} as Record<Category, number>);

    return messages.sort((a, b) => priorities[a.type] - priorities[b.type]);
  }, [category, messages]);

  return (
    <View style={styles.mainContainr}>
      <View style={styles.header}>
        <View style={styles.horizon}>
          <Text style={styles.title}>{user.homelessName}</Text>
          <Tag type="outStatus" text={locationStatus} />
        </View>
        <View>
          <CustomText textColor="gray">{user.shelterName}</CustomText>
        </View>
      </View>
      <View style={styles.gap} />
      <View style={styles.tabContainer}>
        {TABS.map(tabItem => (
          <Pressable
            key={tabItem.value}
            onPress={() => setCategory(tabItem.value)}>
            <Text
              style={[
                styles.tab,
                category === tabItem.value && styles.selectedTab,
              ]}>
              {tabItem.label}
            </Text>
          </Pressable>
        ))}
      </View>
      {!filteredMessage.length ? (
        <View style={styles.emptyContainer}>
          <View style={styles.info}>
            <WarnIcon size={40} color="#70737C29" />
            <Text style={styles.label}>아직 안내된 글이 없어요</Text>
          </View>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.messageBox}>
          {filteredMessage.map(message => (
            <PushMessage key={message.id} data={message} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainr: {
    flex: 1,
  },
  header: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    gap: 8,
  },
  horizon: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    color: '#171719',
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: -0.972,
    lineHeight: 48,
  },
  gap: {
    height: 12,
    backgroundColor: '#F7F7F8',
  },
  tabContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderBottomColor: '#E8E8EA',
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  tab: {
    color: '#2E2F33E0',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 999,
    borderColor: '#E8E8EA',
  },
  selectedTab: {
    backgroundColor: '#F2FFF6',
    borderColor: '#00BF40',
    color: '#00BF40',
  },
  messageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  info: {
    gap: 24,
    flexDirection: 'column',
    alignItems: 'center',
    top: '40%',
  },
  label: {
    fontSize: 20,
    color: '#171719',
    fontWeight: '600',
    lineHeight: 28,
  },
  messages: {
    // padding: 24,
    // gap: 24,
  },
});

export default Home;
