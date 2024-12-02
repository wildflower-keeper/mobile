import {NoticeMessage} from '@/types/NoticeMessage';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomText from '../base/CustomText';
import NoticeContainer from './NoticesGroup';

type PushMessagesProps = {
  title: string;
  messages: NoticeMessage[];
};

function Notices({title, messages}: PushMessagesProps) {
  return (
    <View style={styles.notices}>
      <View style={styles.title}>
        <CustomText textColor="weak" weight="thin">
          {title}
        </CustomText>
      </View>
      {messages &&
        messages.map((message, i) => (
          <NoticeContainer key={i} notice={message} />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  notices: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 12,
    backgroundColor: '#F7F7F8',
  },
  title: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
});

export default Notices;
