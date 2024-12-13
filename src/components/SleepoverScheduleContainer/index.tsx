import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import CustomText from '../base/CustomText';
import AntDesignicon from 'react-native-vector-icons/AntDesign';
import CustomButton from '../base/CustomButton';
import {colors} from '@/constants';
import {useMutateDeleteOvernight} from '@/hooks/queries/useMutateCreateOvernight';
import useOvernightRequestStore from '@/stores/useOverNight';

export type SleepoverType = {
  endDate: string;
  sleepoverId: number;
  startDate: string;
  status: boolean;
};

interface SleepoverScheduleContainerProps {
  sleepover: SleepoverType | null;
}

const SleepoverScheduleContainer = ({
  sleepover,
}: SleepoverScheduleContainerProps) => {
  const {setDeleteTargetId, setDuration} = useOvernightRequestStore();
  const onCancelPress = () => {
    if (!sleepover) return;
    setDeleteTargetId(sleepover.sleepoverId);
    setDuration(`${sleepover.startDate}~${sleepover.endDate}`);
  };
  return (
    <View style={styles.container}>
      {sleepover ? (
        <>
          <View style={styles.sleepoverContainer}>
            <View style={styles.sleepoverDate}>
              <View>
                <CustomText size="small" weight="heavy">
                  시작일
                </CustomText>
                <CustomText size="large">{sleepover.startDate}</CustomText>
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
                <CustomText size="large">{sleepover.endDate}</CustomText>
              </View>
            </View>
          </View>
          {sleepover.status ? (
            <CustomButton label="일정 취소" size="xl" onPress={onCancelPress} />
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
  sleepoverContainer: {
    flex: 0,
    alignItems: 'center',
    gap: 10,
  },
  sleepoverDate: {
    flex: 0,
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SleepoverScheduleContainer;
