import React from 'react';
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import CustomText from '@/components/base/CustomText';
import useSleepovers from '@/hooks/queries/useSleepovers';
import {colors} from '@/constants';
import { differenceInDays } from 'date-fns';
import { formatUpdateTime } from '@/utils/date/date';
import { mapSleepoverData } from '@/utils/data/data';

interface SleepoverSchedulesProps {}

const SleepoverSchedules = ({}: SleepoverSchedulesProps) => {
  const {data: sleepovers} = useSleepovers();
  const sleepoverSchedules = mapSleepoverData(sleepovers || []);

  if (!sleepovers?.length) {
    return (
      <View style={styles.emptyScheduleContainer}>
        <Image
          source={require('@/assets/image/text_bubble.png')}
          style={styles.textBubble}
        />
        <CustomText
          textColor="weak"
          weight="thin"
          style={{fontSize: 11, paddingTop: 10}}>
          현재 신청된 외박일정이 없습니다.
        </CustomText>
      </View>
    );
  }

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.scheduleListContainer}>
      {sleepoverSchedules?.map(sleepover => (
        <View style={styles.scheduleContainer} key={sleepover.sleepoverId}>
          <CustomText
            style={{fontSize: 18, color: colors.PRIMARY, textAlign: 'right'}}>
            {sleepover.dayDiff < 1
              ? '외박 당일입니다.'
              : `${sleepover.dayDiff}일 남았습니다.`}
          </CustomText>
          <View style={styles.scheduleRowContainer}>
            <CustomText>시작</CustomText>
            <CustomText weight="heavy">{sleepover.startDate}</CustomText>
          </View>
          <View style={styles.scheduleRowContainer}>
            <CustomText>종료</CustomText>
            <CustomText weight="heavy">{sleepover.endDate}</CustomText>
          </View>
          <View style={styles.scheduleRowContainer}>
            <CustomText>일정</CustomText>
            <CustomText>{sleepover.reason}</CustomText>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  textBubble: {
    width: 55,
    height: 55,
  },
  scheduleListContainer: {
    flexDirection: 'row',
  },
  emptyScheduleContainer: {
    paddingVertical: 50,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    borderWidth: 8,
    borderRadius: 8,
  },
  scheduleContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 8,
    width: 240,
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 16,
    marginRight: 16,
  },
  scheduleRowContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default SleepoverSchedules;
