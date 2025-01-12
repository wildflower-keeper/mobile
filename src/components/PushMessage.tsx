import React, { useCallback, useState } from 'react';
import CustomText from './base/CustomText';
import { Image, Modal, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Message, MessageTypeKor } from '@/types/NoticeMessage';
import { formatToString } from '@/utils/date/date';
import Tag from './base/Tag';
import { PUT } from '@/utils/api/api';
import { SurveyButton } from './SurveyButton';
import { useQueryClient } from '@tanstack/react-query';
import {ImageViewer} from "react-native-image-zoom-viewer"

type NoticesProps = {
  data: Message;
};

function PushMessage({
  data: {
    id,
    title,
    contents,
    sendAt,
    isRead: read,
    imageUrl,
    // type,
    isSurvey,
    isResponded,
  }
}: NoticesProps) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isRead, setIsRead] = useState<boolean>(read);
  const [isOpenImage, setIsOpenImage] = useState(false);
  const closeImage = () => setIsOpenImage(false);
  const handleClickMessage = useCallback(
    (noticeId: number, isAlreadyRead: boolean) => async () => {
      setIsOpen(prev => !prev);
      if (isAlreadyRead || !noticeId) {
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 3000)); // 즉시 읽음 처리 방지

      PUT(`/api/v2/homeless-app/notice-target/${noticeId}/read`)
        .then(() => {
          setIsRead(true);
          queryClient.invalidateQueries({ queryKey: ['notices'] });
        })
        .catch(console.error);
    },
    [],
  );

  const type = isSurvey ? 'survey' : 'notice';
  const isValidUrl = (url: string) => {
    const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
    return urlPattern.test(url);
  };
  return (
    <View
      style={[
        styles.container,
        !isRead && styles.unreadContainer,
        isSurvey && isResponded && styles.blurry,
      ]}>
      <View style={styles.topHeader}>
        <Tag text={MessageTypeKor[type]} type={type} />
        {!isRead && <View style={styles.unread} />}
      </View>
      <View style={styles.content}>
        <View style={[!!imageUrl && styles.maxWidth]}>
          <TouchableOpacity
            style={[styles.titleContainer]}
            onPress={handleClickMessage(id, isRead)}>
            <CustomText style={styles.title}>{title}</CustomText>
            <CustomText style={styles.date}>
              {formatToString('yyyy.MM.DD', new Date(sendAt))}
            </CustomText>
          </TouchableOpacity>
        </View>
        {imageUrl && isValidUrl(imageUrl) && (
          <>
            <TouchableOpacity
              onPress={() => setIsOpenImage(true)}
              style={styles.imageContainer}>
              <Image
                source={{ uri: imageUrl }}
                style={styles.image}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <Modal visible={isOpenImage} >
              <ImageViewer
                imageUrls={[{ url: imageUrl }]}
                enableSwipeDown={true}
                onSwipeDown={closeImage}
                onCancel={closeImage}
              />
            </Modal>
          </>
        )}
      </View>
      {isOpen && (
        <View style={styles.desc}>
          <CustomText size="small">{contents}</CustomText>
        </View>
      )}
      {isSurvey && <SurveyButton noticeId={id} isAnswered={!!isResponded} />}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
    gap: 12,
    paddingTop: 8,
    paddingBottom: 24,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderBottomColor: '#E8E8EA',
    borderBottomWidth: 1,
  },
  topHeader: {
    width: '100%',
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  unreadContainer: {
    backgroundColor: '#FFFAF7',
  },
  content: {
    position: 'relative',
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  maxWidth: {
    flex: 2,
    maxWidth: '80%',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    flex: 1,
    color: '#171719',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
  },
  date: {
    fontSize: 17,
    fontWeight: '400',
    paddingTop: 6,
  },
  desc: {
    borderLeftColor: '#37383C9C',
    borderLeftWidth: 2,
    marginTop: 0,
    marginLeft: 5,
    paddingLeft: 16,
  },
  unread: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: '#FF5E00',
  },
  surveyButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  blurry: {
    opacity: 0.5,
  },
  surveyButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#70737C38',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 9,
    paddingBottom: 14,
  },
  imageContainer: {
    position: 'absolute',
    right: 10,
    bottom: -10,
    zIndex: 20
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
});

export default PushMessage;
