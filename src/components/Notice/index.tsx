import {AppPush} from '@/types/PushMessage';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomText from '../base/CustomText';
import Message from './Message';

type PushMessagesProps = {
  title: string;
  messages: AppPush[];
};

function Notices({title, messages}: PushMessagesProps) {
  return (
    <View style={styles.notices}>
      <View style={styles.title}>
        <CustomText textColor="weak" weight="thin">
          {title}
        </CustomText>
      </View>
      {messages?.map((message, i) => (
        <Message key={i} message={message} />
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
