import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import CustomText from './base/CustomText';
import {PUT} from '@/utils/api/api';
import {useQueryClient} from '@tanstack/react-query';

type SurveyButtonProps = {
  noticeId: number;
  isAnswered: boolean;
};
export function SurveyButton({noticeId, isAnswered: is}: SurveyButtonProps) {
  const [isAlreadyAnswered, setIsAlreadyAnswered] = useState<boolean>(is);
  const queryClient = useQueryClient();

  if (isAlreadyAnswered) {
    return (
      <View style={styles.answeredContainer}>
        <CustomText weight="heavy" style={styles.answered}>
          참여 신청 완료
        </CustomText>
      </View>
    );
  }

  const handleClickSurvey = (ok: boolean) => () => {
    if (isAlreadyAnswered) {
      return;
    }

    PUT(`/api/v2/homeless-app/notice/${noticeId}/participation`, {
      body: JSON.stringify({isParticipating: ok}),
    }).then(() => {
      setIsAlreadyAnswered(true);
      queryClient.invalidateQueries({queryKey: ['notices']});
    });
  };

  return (
    <View style={styles.surveyButtonContainer}>
      <Pressable style={styles.surveyButton} onPress={handleClickSurvey(false)}>
        <CustomText size="large" weight="heavy">
          불참하기
        </CustomText>
      </Pressable>
      <Pressable style={styles.surveyButton} onPress={handleClickSurvey(true)}>
        <CustomText size="large" weight="heavy" isBadge>
          참여하기
        </CustomText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  answeredContainer: {
    width: '100%',
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: '#70737C38',
    paddingBottom: 13,
    alignContent: 'center',
    justifyContent: 'center',
  },
  answered: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },
  surveyButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
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
});
