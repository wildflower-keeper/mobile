import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import CustomText from '../base/CustomText';
import AntDesignicon from 'react-native-vector-icons/AntDesign';
import CustomButton from '../base/CustomButton';
import {colors} from '@/constants';
import {formatUpdateTime} from '@/utils/date/date';
import {useMutateDeleteOvernight} from '@/hooks/queries/useMutateCreateOvernight';
import queryClient from '@/utils/api/queryClient';

export type upcomingSleepoverType = {
  endDate: string;
  nightCount: number;
  sleepoverId: number;
  startDate: string;
  status: string;
};

interface SleepoverScheduleContainerProps {
  upcomingSleepover?: upcomingSleepoverType;
}

const SleepoverScheduleContainer = ({
  upcomingSleepover,
}: SleepoverScheduleContainerProps) => {
  const deleteSchedule = useMutateDeleteOvernight();

  const handleDeleteSchedule = (sleepoverId: number) => {
    deleteSchedule.mutate(sleepoverId, {
      onSuccess: () => queryClient.invalidateQueries({queryKey: ['userInfo']}),
    });
  };

  return (
    <View style={styles.container}>
      {upcomingSleepover ? (
        <>
          <View style={{flex: 0, alignItems: 'center', gap: 10}}>
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                gap: 16,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <CustomText size="small" weight="heavy">
                  시작일
                </CustomText>
                <CustomText size="large">
                  {formatUpdateTime(new Date(upcomingSleepover.startDate))}
                </CustomText>
              </View>

              <AntDesignicon
                name="arrowright"
                size={30}
                color={colors.BRIGHT_PRIMARY}
              />

              <View>
                <CustomText size="small" weight="heavy">
                  종료일
                </CustomText>
                <CustomText size="large">
                  {formatUpdateTime(new Date(upcomingSleepover.endDate))}
                </CustomText>
              </View>
            </View>
          </View>
          {upcomingSleepover.status === 'FUTURE_SCHEDULED' ? (
            <CustomButton
              label="일정 취소"
              size="xl"
              onPress={() =>
                handleDeleteSchedule(upcomingSleepover.sleepoverId)
              }
            />
          ) : (
            <CustomButton label="현재 진행중" variant="outlined" size="xl" />
          )}
        </>
      ) : (
        <View style={styles.textContainer}>
          <CustomText>현재 신청된 외박일정이 없습니다.</CustomText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    height: 80,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 30,
    width: '100%',
    gap: 20,
    borderColor: colors.BORDER_COLOR,
    borderWidth: 2,
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
  },
});

export default SleepoverScheduleContainer;
