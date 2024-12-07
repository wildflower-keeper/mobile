import React, {useCallback, useState} from 'react';
import CustomText from '../base/CustomText';
import {Image, StyleSheet, View} from 'react-native';
import noticeIcon from '@/assets/icon/bell.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {PUT} from '@/utils/api/api';
import {NoticeMessage} from '@/types/NoticeMessage';
import {formatSimpleDate, formatToString} from '@/utils/date/date';

type NoticesProps = {
  notice: NoticeMessage;
};

function NoticeContainer({
  notice: {id, title, contents, sendAt, read},
}: NoticesProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isRead, setIsRead] = useState<boolean>(read);

  const handleClickMessage = useCallback(
    (noticeId: number, isAlreadyRead: boolean) => () => {
      console.log(noticeId, isAlreadyRead);
      setIsOpen(prev => !prev);
      if (isAlreadyRead || !noticeId) {
        return;
      }

      PUT(`/api/v2/homeless-app/notice-target/${noticeId}/read`)
        .then(() => setIsRead(true))
        .catch(console.error);
    },
    [],
  );

  return (
    <View style={[styles.container, !isRead && styles.unreadContainer]}>
      <Image source={noticeIcon} style={styles.icon} />
      <View style={styles.content}>
        <TouchableOpacity onPress={handleClickMessage(id, isRead)}>
          <CustomText>{title}</CustomText>
          <CustomText style={styles.date}>
            {formatToString('yyyy.MM.DD', new Date(sendAt))}
          </CustomText>
        </TouchableOpacity>
        {isOpen && (
          <View style={styles.desc}>
            <CustomText size="small">{contents}</CustomText>
          </View>
        )}
      </View>
      {!isRead && <View style={styles.unread} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    overflow: 'hidden',
    gap: 12,
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderBottomColor: '#E8E8EA',
    borderBottomWidth: 1,
  },
  unreadContainer: {
    backgroundColor: '#FFFAF7',
  },
  icon: {
    marginTop: 3,
    width: 24,
    height: 24,
  },
  content: {
    flex: 1,
  },
  date: {
    fontSize: 17,
    fontWeight: '400',
    paddingTop: 8,
  },
  desc: {
    borderLeftColor: '#171719',
    borderLeftWidth: 2,
    marginTop: 16,
    paddingLeft: 16,
  },
  unread: {
    marginTop: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5E00',
  },
});

export default NoticeContainer;